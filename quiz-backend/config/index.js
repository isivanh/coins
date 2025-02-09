require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENVIRONMENT || "development",
    secretKey: process.env.SECRET_KEY || "octocat",
};