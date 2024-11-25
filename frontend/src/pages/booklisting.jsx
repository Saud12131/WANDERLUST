import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import BookingForm from '../components/BookingForm';
import PaymentButton from '../components/PaymentButton';
import BookingSummary from '../components/BookingSummery';
import {  ArrowBigLeftDash,} from 'lucide-react';
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
        if (bookingDetails.checkInDate && bookingDetails.checkOutDate) {
            const start = new Date(bookingDetails.checkInDate);
            const end = new Date(bookingDetails.checkOutDate);
            if (end > start) {
                const days = (end - start) / (1000 * 60 * 60 * 24);
                setDaysBooked(days);
            } else {
                setDaysBooked(0);
            }
        }
    }, [bookingDetails.checkInDate, bookingDetails.checkOutDate]);

    useEffect(() => {
        if (listingDetails.price && daysBooked > 0) {
            setBookingDetails((prev) => ({
                ...prev,
                totalPricetoPay: listingDetails.price * daysBooked,
            }));
        }
    }, [daysBooked, listingDetails.price]);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!token) {
                    notify("Please log in to proceed.");
                    navigate("/login");
                    return;
                }

                const { data } = await axios.get(
                    `http://localhost:3000/api/listings/listingdetails/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (data.success) {
                    setListingDetails(data.listingdetails);
                    setBookingDetails((prev) => ({
                        ...prev,
                        listing: data.listingdetails._id,
                    }));
                }
            } catch (err) {
                console.error(err);
                notify(err.message);
            }
        };

        if (id) fetchDetails();
    }, [id, token, navigate]);

    // Handle Input Change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBookingDetails({ ...bookingDetails, [id]: value });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-10">
            <i><a href="/alllistings"><ArrowBigLeftDash/></a></i>
            <h2 className="text-2xl font-semibold mb-6 text-center">Booking Details</h2>
             <BookingSummary totalPrice={bookingDetails.totalPricetoPay} /> 
            <BookingForm bookingDetails={bookingDetails} handleInputChange={handleInputChange} />
            <PaymentButton bookingDetails={bookingDetails} notify={notify} />
            <ToastContainer />
        </div>
    );
}
