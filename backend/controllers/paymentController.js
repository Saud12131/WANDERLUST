const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require("../models/paymentModel");


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const CheckOut = async (req, res) => {
    try {
        const userId = req.user.id;  
        console.log("User ID in Checkout:", userId);
        const order = await instance.orders.create({
            amount: Number(req.body.amount * 100), 
            currency: "INR",
            notes: {
                userId: userId, 
            },
        });

        if (!order) {
            return res.status(402).json({
                success: false,
                message: "Order creation failed",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const PaymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

      
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            
            const order = await instance.orders.fetch(razorpay_order_id);
            console.log("Fetched Razorpay Order:", order);
            const userId = order.notes?.userId; 

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: "User ID not found for the payment",
                });
            }

         
            await Payment.create({
                user: userId,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            return res.redirect(`http://localhost:5173/booklisting/paymentsuccess?reference=${razorpay_payment_id}`);
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed. Signature mismatch",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};




module.exports = {
    CheckOut,
    PaymentVerification
}