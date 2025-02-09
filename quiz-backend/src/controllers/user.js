const { User } = require('../models/user');
const greetings = async (req, res) => {
    res.send('Hello from user route');
};

const getName = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.send(user.firstName);
}

module.exports = {
    greetings,
    getName
};