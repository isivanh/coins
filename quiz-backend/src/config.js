module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV || "development",
    secretKey: process.env.SECRET_KEY,
};
