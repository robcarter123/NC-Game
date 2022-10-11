const db = require("../db/connection.js")

const selectCategories = (req,res,next) => {
    return db.query(`SELECT * FROM categories`);
}

module.exports = { selectCategories };