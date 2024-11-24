
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from "bcryptjs"

const UserSchema = mongoose.Schema({
    pic: {
        type: String,
        default: "https://i.pinimg.com/originals/68/0e/24/680e241336ae8d3a57a42f54b656e58f.jpg"
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
    }]
}, {
    timestamps: true,
});

// Method to compare entered password with hashed password
UserSchema.methods.matchpassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    // Check if the password is modified
    if (!this.isModified('password')) { // Fixed: check if 'password' is modified
        return next(); // Return next if password is not modified
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Call next after hashing
});

const User = mongoose.model('User', UserSchema);
export default User;
