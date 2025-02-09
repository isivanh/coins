const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET;


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Acceso denegado: no se proporcionó token.');
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).send('Acceso denegado: token no válido o expirado.');
    }
};

module.exports = authMiddleware;