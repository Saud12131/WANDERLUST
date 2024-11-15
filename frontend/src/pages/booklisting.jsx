import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function BookListing() {
    const [listingDetails, setListingDetails] = useState({});
    const [bookingDetails, setBookingDetails] = useState({
        listing: null,
        checkInDate: '',
        checkOutDate: '',
        numOfGuest: '',
        totalPricetoPay: 0,
    });
    const [daysBooked, setDaysBooked] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');  // Get token from localStorage

    const notify = (message) => toast(message);

    // Calculate Days Booked
    useEffect(() => {
        const calculateDays = () => {
            const { checkInDate, checkOutDate } = bookingDetails;
            if (checkInDate && checkOutDate) {
                const start = new Date(checkInDate);
                const end = new Date(checkOutDate);
                if (end > start) {
                    const timeDifference = end - start;
                    const days = timeDifference / (1000 * 60 * 60 * 24);
                    setDaysBooked(days);
                } else {
                    setDaysBooked(0);
                }
            }
        };
        calculateDays();
    }, [bookingDetails.checkInDate, bookingDetails.checkOutDate]);

    // Update Total Price whenever DaysBooked changes
    useEffect(() => {
        if (listingDetails.price && daysBooked > 0) {
            setBookingDetails((prevDetails) => ({
                ...prevDetails,
                totalPricetoPay: listingDetails.price * daysBooked,
            }));
        }
    }, [daysBooked, listingDetails.price]);

    // Fetch Listing Details
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!token) {
                    notify("Please log in to proceed.");
                    navigate("/login");  // Redirect to login if no token
                    return;
                }

                const response = await axios.get(
                    `http://localhost:3000/api/listings/listingdetails/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success && response.data.listingdetails) {
                    const listing = response.data.listingdetails;
                    setListingDetails(listing);
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        listing: listing._id,
                    }));
                } else {
                    console.error('Unexpected data format', response.data);
                }
            } catch (err) {
                console.error('An error occurred:', err);
                setListingDetails(null);
            }
        };

        if (id) fetchDetails();
    }, [id, token]);

    // Handle Input Change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBookingDetails({ ...bookingDetails, [id]: value });
    };

    // Handle Booking Submission
    const handleBooking = async (e) => {
        e.preventDefault();

        if (!token) {
            notify("Please log in to proceed.");
            navigate("/login");  // Redirect to login if token is missing
            return;
        }

        console.log("Booking Details:", bookingDetails);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/bookings/booklisting',
                bookingDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                notify('Listing booked successfully');
                navigate('/alllistings');
            } else {
                notify('Booking failed');
            }
        } catch (err) {
            console.error(err);
            notify('An error occurred');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Please Enter Your Booking Details</h2>
            <h3 className='text-2xl font-semibold mb-6 text-center'>Price to Pay: {bookingDetails.totalPricetoPay}</h3>
            <form className="space-y-4" onSubmit={handleBooking}>
                <div>
                    <label htmlFor="checkInDate" className="block text-gray-700 font-medium">
                        Check-In Date
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={bookingDetails.checkInDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
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
                        className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
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
                        min="1"
                        className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={()=>{navigate(`/booklisting/${id}/payment`)}}
                >
                    Proceed to Pay
                </button>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                   Book listing 
                </button>
            </form>
            <div>
          
                <h3 className='text-2xl font-semibold mb-6 text-center mt-3'>You are booking this listing for  {daysBooked} Days</h3>
            </div>
            <ToastContainer />
            <h4>NOTE:- the price will be update when you will select date</h4>
        </div>
    );
}
