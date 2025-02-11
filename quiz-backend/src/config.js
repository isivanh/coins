const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') })

//require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    env: process.env.ENVIRONMENT || "development",
    secretKey: process.env.SECRET_KEY,
};
