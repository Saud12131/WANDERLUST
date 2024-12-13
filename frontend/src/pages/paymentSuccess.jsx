import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const url = import.meta.env.BACKEND_BASE_URLL;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Success</h2>
                <h4 className="text-lg text-gray-700 mb-6">Your booking has been confirmed!</h4>
                <button
                    onClick={() => navigate("/mybookings")}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                    View Bookings
                </button>
            </div>
        </div>
    );
}
