import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const BookingSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
       // required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalPricetoPay: {
        type: Number,
        required: true,
        min: 0,
    },
    numOfGuest: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
})
const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
