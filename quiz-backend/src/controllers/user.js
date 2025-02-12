const userService = require('../services/user-service');
const { UserSelfTransferError } = require('../errors/user-errors');
const asyncHandler = require('../utils/async-handler');

const getAllUsers = asyncHandler(async (req, res) => {
    const { email } = req.user;
    const result = await userService.getAllUsers(email);
    res.status(200).send(result);
});

const transferCoins = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const { amount, toEmail } = req.body;
    if (email === toEmail) {
        throw next(new UserSelfTransferError());
    }
    const result = await userService.transferCoinsTo(email, amount, toEmail);
    res.status(200).send(result);
});

module.exports = {
    getAllUsers,
    transferCoins
};