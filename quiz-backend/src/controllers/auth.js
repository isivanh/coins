const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
let users = [];

const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log('Iniciando proceso de registro de usuario...');
    if (users.find(user => user.email === email)) {
        return res.status(400).send({ 'error': 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        email,
        password: hashedPassword
    };
    users.push(newUser);
    res.status(201).send({ 'message': 'User created successfully' });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send({ 'error': 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ 'error': 'Invalid credentials' });
    }
    const token = jwt.sign({ email }, config.secretKey, { expiresIn: '1h' });
    res.status(200).send({ token });
};

module.exports = {
    signup,
    login
};