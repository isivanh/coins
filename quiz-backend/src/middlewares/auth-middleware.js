const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({
            message: 'Forbidden access: Token not provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, config.secretKey);
        expiration_date = decoded.exp;
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).send({
            message: 'Forbidden access: Token invalid or expired.'
        });
    }
};

module.exports = authMiddleware;