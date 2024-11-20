const Joi = require("joi");

const ListingValidation = Joi.object({


    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Title must be at least 3 characters',
            'string.max': 'Title can be up to 100 characters',
            'any.required': 'Title is required',
        }),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.min': 'Description must be at least 10 characters',
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
        .min(100)
        .required()
        .messages({
            'number.min': 'Price must be a greater then 100 number',
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
    //write logic here
});

const UserLogOutinValidation = Joi.object({
    //write logic here
});


const BookingValidation = Joi.object({
    //write logic here
});


const PaymentValidation = Joi.object({
    //write logic here
});

module.exports = {
    ListingValidation,
    UserValidation,
    BookingValidation,
    PaymentValidation,
}