const Booking = require("../models/bookingmodel");
const Listing = require("../models/listingmodel");
const User = require("../models/usermodel");
const mongoose = require("mongoose");
const CreateBooking = async (req, res) => {
    const { listing, checkInDate, checkOutDate, totalPricetoPay, numOfGuest } = req.body;

    if (!listing || !checkInDate || !checkOutDate || !totalPricetoPay || !numOfGuest) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {

        const existingListing = await Listing.findById(listing);
        if (!existingListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found."
            });
        }


        const newBooking = await Booking.create({
            user: req.user.id,
            listing,
            checkInDate,
            checkOutDate,
            numOfGuest,
            totalPricetoPay,
        });

        console.log(newBooking);

        return res.status(201).json({
            success: true,
            message: "Listing booked successfully.",
            booking: newBooking,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the booking.",
            error: err.message,
        });
    }
};


const Mybookings = async (req, res) => {
    try {
        const UserId = req.user.id; 

        if (!UserId) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

      
        const BookingDetails = await Booking.find({ user:UserId })
            .populate("listing") 
           

        if (!BookingDetails || BookingDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for this user",
            });
        }

        res.status(200).json({
            success: true,
            BookingDetails,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    Mybookings,
};


module.exports = {
    CreateBooking,
    Mybookings
};