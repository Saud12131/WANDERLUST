const Booking = require("../models/bookingmodel");
const Listing = require("../models/listingmodel");
const User = require("../models/usermodel");
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


module.exports = { CreateBooking };