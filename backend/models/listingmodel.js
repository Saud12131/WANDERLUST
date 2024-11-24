
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const listingSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // filename: String,
        default: "https://tse3.mm.bing.net/th?id=OIP.8QfIzV-9FRgPdMAtvupa4QHaE8&pid=Api&P=0&h=180",
    },
    price: {
        type: Number,
        required: true,

    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
