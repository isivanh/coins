const { body, header, validationResult } = require('express-validator')

const loginValidationRules = () => {
    return [
        body('email').isEmail()
            .withMessage('Email value not valid'),
        body('password').isLength({ min: 6 })
            .withMessage('Password value not valid'),
    ]
}
const signupValidationRules = () => {
    return [
        body('firstName').isString()
            .withMessage('First name value not valid'),
        body('lastName').isString()
            .withMessage('Last name value not valid'),
        body('email').isEmail()
            .withMessage('Email value not valid'),
        body('password').isLength({ min: 6 })
            .withMessage('Password value not valid'),
    ]
}
const validateValidationRules = () => {
    return [
        header('Authorization')
            .exists()
            .contains('Bearer')
            .withMessage('Authorization not valid'),
    ]
}
const transferValidationRules = () => {
    return [
        body('amount')
            .isInt({ min: 1 })
            .withMessage('Amount must be greater than 0'),
        body('toEmail').isEmail(),
        header('Authorization')
            .exists()
            .contains('Bearer')
            .withMessage('Authorization not valid'),
    ]
}
const usersValidationRules = () => {
    return [
        header('Authorization')
            .exists()
            .contains('Bearer')
            .withMessage('Authorization not valid'),
    ]
}
const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({
        message: errors.array().map(error => error.msg)
    });
}

module.exports = {
    loginValidationRules,
    signupValidationRules,
    validateValidationRules,
    transferValidationRules,
    usersValidationRules,
    validator
}