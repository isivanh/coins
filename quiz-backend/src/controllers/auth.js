const userService = require('../services/user-service');
const asyncHandler = require('../utils/async-handler');

const signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const result = await userService.createUser({ firstName, lastName, email, password });
    res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.status(200).send(result);
});
const validate = asyncHandler(async (req, res) => {
    const result = await userService.getUserByEmail(req.user.email);
    res.status(200).send(result);
});
const logout = asyncHandler(async (req, res) => {
    res.status(200).send({
        code: 200,
        message: 'Logout successful'
    });
});

module.exports = {
    signup,
    login,
    validate,
    logout
};