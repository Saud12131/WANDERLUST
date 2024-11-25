
import Joi from "joi"
import User from "../models/usermodel.js";
const ListingValidation = Joi.object({


    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.min': 'Title must be at least 1 characters',
            'string.max': 'Title can be up to 100 characters',
            'any.required': 'Title is required',
        }),
    description: Joi.string()
        .min(1)
        .max(500)
        .required()
        .messages({
            'string.min': 'Description must be at least 1 characters',
            'string.max': 'Description can be up to 500 characters',
            'any.required': 'Description is required',
        }),
    image: Joi.string()
        .uri()
        .default('https://tse3.mm.bing.net/th?id=OIP.8QfIzV-9FRgPdMAtvupa4QHaE8&pid=Api&P=0&h=180')
        .messages({
            'string.uri': 'unabel to fetch image',
        }),
    price: Joi.number()
        .min(1)
        .required()
        .messages({
            'number.min': 'Price must be a greater then 1number',
            'any.required': 'Price is required',
        }),
    location: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': 'Location must be at least 3 characters',
            'any.required': 'Location is required',
        }),
    country: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': 'Country must be at least 3 characters',
            'any.required': 'Country is required',
        }),
});

const UserLoginValidation = Joi.object({

    email: Joi.string()
        .min(5)
        .email({ tlds: { allow: false } })
        .required()
        .custom(async (value, helpers) => {
            const UserExist = await User.findOne({ email: value });
            if (!UserExist) {
                return helpers.message('User not found');
            }
            return value;
        })
        .messages({
            'string.min': 'please enter correct email address',
            'any.required': 'Email is required',
            'string.email': "Please enter a valid email address"
        }),

    password: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.min': 'the password should be more then 3 characters',
            'any.required': 'password is required',
            'string.max': "password is too long"
        })

});


const NewUserValidation = Joi.object({
    username: Joi.string()
        .min(3)
        .max(20)
        .required()
        .custom(async (value, helpers) => {
            const UserExist = await User.findOne({ username: value });
            if (UserExist) {
                return helpers.message('Username already exists');
            }
            return value;
        })
        .messages({
            'string.min': 'Country must be at least 3 characters',
            'string.max': 'keep the username short',
            'any.required': 'Username is required',
        }),

    email: Joi.string()
        .min(5)
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.min': 'please enter correct email address',
            'any.required': 'Email is required',
            'string.email': "Please enter a valid email address"
        }),

    password: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.min': 'the password should be more then 3 characters',
            'any.required': 'password is required',
            'string.max': "password is too long"
        })

});


const BookingValidation = Joi.object({
  
    listing: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid listing ID format',
            'any.required': 'Listing ID is required',
        }),

    checkInDate: Joi.date()
        .required()
        .messages({
            'any.required': 'Check-in date is required',
            'date.base': 'Invalid check-in date format',
        }),
    checkOutDate: Joi.date()
        .greater(Joi.ref('checkInDate'))
        .required()
        .messages({
            'any.required': 'Check-out date is required',
            'date.base': 'Invalid check-out date format',
            'date.greater': 'Check-out date must be after the check-in date',
        }),
    totalPricetoPay: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Total price to pay must be a number',
            'number.min': 'Total price to pay must be at least 0',
            'any.required': 'Total price to pay is required',
        }),
    numOfGuest: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Number of guests must be a number',
            'number.min': 'Number of guests must be at least 1',
            'any.required': 'Number of guests is required',
        }),
});


const PaymentValidation = Joi.object({
    razorpay_order_id: Joi.string()
        .required()
        .messages({
            'string.base': 'Razorpay order ID must be a string',
            'any.required': 'Razorpay order ID is required',
        }),
    razorpay_payment_id: Joi.string()
        .required()
        .messages({
            'string.base': 'Razorpay payment ID must be a string',
            'any.required':'payment id  is required '
        }),
    razorpay_signature: Joi.string()
        .required()
        .messages({
            'string.base': 'Razorpay signature must be a string',
            'any.required':'signature is required '
        }),
  
});

export {
    ListingValidation,
    UserLoginValidation,
    NewUserValidation,
    BookingValidation,
    PaymentValidation,
}