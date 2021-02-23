const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
    body('name')
        .isLength({min: 3, max: 56})
        .withMessage('Name must contain at least 3 symbols')
        .trim(),
    body('email')
        .isEmail().withMessage('Please type email value')
        .custom(async (value, {req}) => {
            try {
                const user = await User({email: value});
                if (user) {
                    return new Promise.reject(`User with email ${value} is already exists`);
                }
            } catch (error) {
                console.log(error);
            }
        })
        .normalizeEmail(),
    body('password', 'Password length must be more then 5 symbols')
        .isLength({min:6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password){
                throw new Error('Password and Confirm password have to be equal')
            }
            return true;
        })
        .trim()
]

exports.loginValidators = [
    body('email')
    .isEmail().withMessage('Please type  email value')
    .custom(async (val, {req}) => {
        try {
            const user = await User({email: value});
            if (!user) {
                return new Promise.reject(`User with email ${value} is not exist`);
            }
        } catch (error) {
            console.log(error);
        }
    }),
    body('password')
        .isLength({min: 6, max: 56}, 'Password length must be more then 5 symbols')
        .isAlphanumeric().withMessage('Password have to contain letters and at least 1 digit')
        .trim()
]