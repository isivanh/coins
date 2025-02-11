const e = require('express');
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    const { email } = req.user;
    const result = await userService.getAllUsers(email);
    res.status(result.code).send(result);
};

const transferCoins = async (req, res) => {
    const { email } = req.user;
    const { amount, toEmail } = req.body;
    if (!amount || !toEmail) {
        res.status(400).send({ code: 400, message: 'Missing required fields' });
    }
    if (amount <= 0) {
        res.status(400).send({ code: 400, message: 'Amount must be greater than 0' });
    }
    if (email === toEmail) {
        res.status(400).send({ code: 400, message: 'Cannot transfer coins to yourself' });
    }
    const result = await userService.transferCoinsTo(email, amount, toEmail);
    res.status(result.code).send(result);
}

module.exports = {
    getAllUsers,
    transferCoins
};