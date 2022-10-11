const db = require("../db/connection.js")

const selectUsers = (req, res, next) => {
    return db.query(`SELECT * FROM users`);
}

module.exports = { selectUsers };