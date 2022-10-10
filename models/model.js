const db = require("../db/connection.js")

const selectCategories = (req,res,next) => {
    console.log('inside the selectCategories model');
    return db.query(`SELECT * FROM categories`);
}


module.exports = { selectCategories };