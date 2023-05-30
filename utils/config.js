const env = require("dotenv");
env.config();
module.exports = {
    PORT: process.env.PORT,
    DB_URL_LOCAL: process.env.DB_URL_LOCAL
};