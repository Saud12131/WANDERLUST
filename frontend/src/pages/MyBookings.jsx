import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, User , ArrowBigLeft } from 'lucide-react';

export default function MyBookings() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsResponse = await axios.get("http://localhost:3000/api/bookings/mybookings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (bookingsResponse.data && Array.isArray(bookingsResponse.data.BookingDetails)) {
                    setListings(bookingsResponse.data.BookingDetails);
                } else {
                    setListings([]);
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setListings([]);
                    console.log("No bookings found");
                } else {
                    console.error("Error fetching bookings:", err);
                    setListings([]);
                }
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <i><a href="/alllistings"><ArrowBigLeft/></a></i>
            <div className="max-w-7xl mx-auto ">
                <div className="text-center w-full border-solid border-2 border-slate-200 mb-5 pt-3">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 ">My Bookings</h1>
                </div>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((booking, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow-lg rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{booking.listing.title}</h2>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{booking.listing.location || 'Location not specified'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <User className="h-5 w-5 mr-2" />
                                        <span>{booking.numOfGuest || 'Guests not specified'} guests</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <CalendarDays className="h-5 w-5 mr-2" />
                                        <div>
                                            <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString("en-us", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                            <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString("en-us", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block">
                                        Booking Confirmed
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-500 text-center">No bookings available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

