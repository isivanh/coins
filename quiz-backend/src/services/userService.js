const { User } = require('../models/user');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Sequelize, Transaction } = require('sequelize');
const { sequelize } = require('../models/db');
const { throws } = require('node:assert');

const createUser = async (user) => {
    const { firstName, lastName, email, password } = user;
    const userInstance = await User.findOne({ where: { email } });
    if (userInstance) {
        return {
            code: 400,
            message: 'User already exists'
        };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    const token = jwt.sign({ email }, config.secretKey, { expiresIn: '1h' });
    return {
        code: 201,
        message: 'User created successfully',
        user: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            coins: newUser.coins,
            token: token
        }
    };
};

const loginUser = async (userCredentials) => {
    const { email, password } = userCredentials;
    const userInstance = await User.findOne({ where: { email } });
    if (!userInstance) {
        return {
            code: 400,
            message: 'User not found'
        };
    }
    if (!await bcrypt.compare(password, userInstance.password)) {
        return {
            code: 400,
            message: 'Invalid credentials'
        };
    }
    const token = jwt.sign({ email }, config.secretKey, { expiresIn: '1h' });
    return {
        code: 200,
        message: 'Login successful',
        user: {
            firstName: userInstance.firstName,
            lastName: userInstance.lastName,
            email: userInstance.email,
            coins: userInstance.coins,
            token: token
        }
    };
};

const getUserByEmail = async (email) => {
    const userInstance = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins'],
        where: { email }
    });
    if (!userInstance) {
        return {
            code: 400,
            message: 'User not found'
        };
    }
    return {
        code: 200,
        message: 'Login successful',
        user: userInstance
    };
};

const getAllUsers = async (email) => {
    const usersInstance = await User.findAll({
        attributes: ['email', 'firstName'],
        where: {
            email: {
                [Op.ne]: email,
            }
        }
    });
    if (!usersInstance) {
        return {
            code: 400,
            message: 'Users not found'
        };
    }
    return {
        code: 200,
        message: 'Successful',
        usersInstance
    };
};

const transferCoinsTo = async (from, amount, to) => {

    try {
        await sequelize.transaction({ type: Transaction.TYPES.IMMEDIATE }, async transaction => {
            const fromUser = await User.findOne(
                {
                    attributes: ['id', 'firstName', 'lastName', 'email', 'coins'],
                    where: { email: from }
                },
                { transaction }
            );
            if (!fromUser) {
                throw new Error('Origin user not found');
            }
            const toUser = await User.findOne(
                {
                    attributes: ['id', 'firstName', 'lastName', 'email', 'coins'],
                    where: { email: to }
                },
                { transaction }
            );
            if (!toUser) {
                throw new Error('Destination user not found');
            }
            if (fromUser.coins < amount) {
                throw new Error('Insufficient coins');
            }
            await fromUser.update(
                { coins: parseInt(fromUser.coins) - parseInt(amount) },
                { transaction }
            );
            await toUser.update(
                { coins: parseInt(toUser.coins) + parseInt(amount) },
                { transaction }
            );
        });
    } catch (err) {
        return {
            code: 400,
            message: err.message || 'Error transferring coins'
        };
    }

    const user = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins'],
        where: { email: from }
    });
    return {
        code: 200,
        message: 'Coins transferred successfully',
        user
    };
};
module.exports = {
    createUser,
    loginUser,
    getUserByEmail,
    getAllUsers,
    transferCoinsTo
};