const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },
    // amount: {
    //     type: Number,
    //     required: true,
    // },
    // currency: {
    //     type: String,
    //     required: true,
    //     default: "INR",
    // },
    // receipt: {
    //     type: String,
    // },
    // status: {
    //     type: String,
    //     enum: ["created", "paid", "failed"],
    //     required: true,
    //     default: "created",
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        timestamps: true,
    },
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;