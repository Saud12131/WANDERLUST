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
        const order = await instance.orders.create({
            amount: Number(req.body.amount * 100),
            currency: "INR",
        });

        if (!order) {
            res.status(402).json({
                success: false,
                message: "order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "order created successfully",
            order,
        });
    } catch (err) {
        res.status(402).json({
            success: true,
            message: err,
        });
    }

}


const PaymentVerification = async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;


        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        console.log("sig recived", razorpay_signature);
        console.log("sig genrated", expectedSignature);

        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {

            await Payment.create({
                user: req.user.id,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            })

            return res.redirect(`http://localhost:5173/booklisting/paymentsuccess?reference=${razorpay_payment_id}`);
        } else {

            return res.status(400).json({
                success: false,
                message: "Not authenticated",
            });
        }
    } catch (err) {
        // Catch any errors and respond with a failure message
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}



module.exports = {
    CheckOut,
    PaymentVerification
}