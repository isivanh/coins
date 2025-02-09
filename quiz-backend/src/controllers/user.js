
const greetings = async (req, res) => {
    res.send('Hello from user route');
};

const getName = async (req, res) => {
    res.send('without name');
}

module.exports = {
    greetings,
    getName
};