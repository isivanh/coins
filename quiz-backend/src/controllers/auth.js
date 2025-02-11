const userService = require('../services/userService');

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const result = await userService.createUser({ firstName, lastName, email, password });
    res.status(result.code).json(result);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.status(result.code).send(result);
};
const validate = async (req, res) => {
    const result = await userService.getUserByEmail(req.user.email);
    res.status(result.code).send(result);
}
const logout = async (req, res) => {
    res.status(200).send('Logout successful');
};

module.exports = {
    signup,
    login,
    validate,
    logout
};