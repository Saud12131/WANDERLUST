import React from 'react';

export default function BookingForm({ bookingDetails, handleInputChange }) {
    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="checkInDate" className="block text-gray-700 font-medium">
                    Check-In Date
                </label>
                <input
                    type="date"
                    id="checkInDate"
                    value={bookingDetails.checkInDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="checkOutDate" className="block text-gray-700 font-medium">
                    Check-Out Date
                </label>
                <input
                    type="date"
                    id="checkOutDate"
                    value={bookingDetails.checkOutDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="numOfGuest" className="block text-gray-700 font-medium">
                    Number of Guests
                </label>
                <input
                    type="number"
                    id="numOfGuest"
                    value={bookingDetails.numOfGuest}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    min="1"
                    required
                />
            </div>
        </form>
    );
}
