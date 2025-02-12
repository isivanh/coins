const AppError = require('./app-error');

class UserNotFoundError extends AppError {
    constructor(message = 'User not found') {
        super(message, 404);
    }
}
class UserAlreadyExistsError extends AppError {
    constructor(message = 'User already exists') {
        super(message, 400);
    }
}
class TranferCoinsError extends AppError {
    constructor(message = 'Error transferring coins') {
        super(message, 400);
    }
}
class UserWithInsufficientCoinsError extends AppError {
    constructor(message = 'User has insufficient coins') {
        super(message, 400);
    }
}
class UserInvalidCredentialsError extends AppError {
    constructor(message = 'Invalid credentials') {
        super(message, 400);
    }
}
class UserSelfTransferError extends AppError {
    constructor(message = 'Cannot transfer coins to yourself') {
        super(message, 400);
    }
}

module.exports = {
    UserNotFoundError,
    UserAlreadyExistsError,
    TranferCoinsError,
    UserWithInsufficientCoinsError,
    UserInvalidCredentialsError,
    UserSelfTransferError
};
