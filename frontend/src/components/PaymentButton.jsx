import React from 'react';
import axios from 'axios';

export default function PaymentButton({ bookingDetails, notify, }) {
    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            notify("Please log in to proceed.");
            return;
        }

        try {
            const { data: { key } } = await axios.get("http://localhost:3000/api/key", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { data: { order } } = await axios.post(
                "http://localhost:3000/api/payment/checkout",
                { amount: bookingDetails.totalPricetoPay },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,
                callback_url: "http://localhost:3000/api/payment/paymentverification",
                prefill: { name: "User", email: "user@example.com" },
                theme: { color: "#121212" },
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (err) {
            console.error(err);
            notify("Payment failed. Try again.");
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            type='submit'
        >
            Proceed to Pay
        </button>
    );
}
