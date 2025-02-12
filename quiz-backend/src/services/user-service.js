const { User } = require('../models/user');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Transaction } = require('sequelize');
const { sequelize } = require('../models/db');
const { UserAlreadyExistsError, UserNotFoundError, TranferCoinsError, UserWithInsufficientCoinsError, UserInvalidCredentialsError } = require('../errors/user-errors');

const createUser = async (user) => {
    const { firstName, lastName, email, password } = user;
    const userInstance = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins'],
        where: { email }
    });
    if (userInstance) {
        throw new UserAlreadyExistsError();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    const token = jwt.sign({ email }, config.secretKey, { expiresIn: '1h' });
    return {
        message: 'User created successfully',
        user: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            coins: newUser.coins,
        },
        token
    };
};

const loginUser = async (userCredentials) => {
    const { email, password } = userCredentials;
    const userInstance = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins', 'password'],
        where: { email }
    });
    if (!userInstance) {
        throw new UserNotFoundError();
    }
    if (!await bcrypt.compare(password, userInstance.password)) {
        throw new UserInvalidCredentialsError();
    }
    const token = jwt.sign({ email }, config.secretKey, { expiresIn: '1h' });
    return {
        message: 'Login successful',
        user: {
            firstName: userInstance.firstName,
            lastName: userInstance.lastName,
            email: userInstance.email,
            coins: userInstance.coins,
        },
        token
    };
};

const getUserByEmail = async (email) => {
    const userInstance = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins'],
        where: { email }
    });
    if (!userInstance) {
        throw new UserNotFoundError();
    }
    return {
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
        throw new UserNotFoundError();
    }
    return {
        message: 'Successful',
        user: usersInstance
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
                throw new UserNotFoundError();
            }
            const toUser = await User.findOne(
                {
                    attributes: ['id', 'firstName', 'lastName', 'email', 'coins'],
                    where: { email: to }
                },
                { transaction }
            );
            if (!toUser) {
                throw new UserNotFoundError();
            }
            if (fromUser.coins < amount) {
                throw new UserWithInsufficientCoinsError();
            }
            await fromUser.update(
                { coins: fromUser.coins - amount },
                { transaction }
            );
            await toUser.update(
                { coins: toUser.coins + amount },
                { transaction }
            );
        });
    } catch (err) {
        throw new TranferCoinsError(`Transfer failed: ${err.message}`);
    }

    const user = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'coins'],
        where: { email: from }
    });
    return {
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