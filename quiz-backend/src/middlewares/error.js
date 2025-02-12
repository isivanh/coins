const AppError = require('../errors/app-error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.code).send({
            message: err.message
        });
    }
    return res.status(500).send({
        message: 'Internal server error'
    });
};

module.exports = errorHandler;