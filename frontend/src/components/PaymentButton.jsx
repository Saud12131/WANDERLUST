import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function PaymentButton({ bookingDetails, notify }) {
    const navigate = useNavigate();
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
           // console.log(order);

            
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,
                callback_url: "http://localhost:3000/api/payment/paymentverification",
                prefill: { name: "User", email: "user@example.com" },
                theme: { color: "#121212" },
                handler: async function (response) {
                    // Step 4: Verify payment and create booking
                    try {
                        const bookingResponse = await axios.post(
                            "http://localhost:3000/api/bookings/booklisting",
                            bookingDetails,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        notify("Booking successful!");
                        navigate("/booklisting/paymentsuccess")
                    } catch (error) {
                        console.error(error);
                        notify("Failed to create booking.");
                    }
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error(err);
            notify("Payment failed. Try again.");
            notify(err.message)
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            type="button"
        >
            Proceed to Pay
        </button>
    );
}
