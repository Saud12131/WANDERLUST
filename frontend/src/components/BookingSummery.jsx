import React from 'react';

export default function BookingSummary({ totalPrice }) {
    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Total Price to Pay: ₹{totalPrice}</h3>
        </div>
    );
}
