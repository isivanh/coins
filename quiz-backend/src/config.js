const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
    port: process.env.PORT,
    env: process.env.ENVIRONMENT || "development",
    secretKey: process.env.SECRET_KEY,
};
