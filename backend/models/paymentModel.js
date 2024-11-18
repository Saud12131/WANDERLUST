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