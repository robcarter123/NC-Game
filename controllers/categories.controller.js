const { selectCategories } = require("../models/categories.model");

const getCategories = (req,res) => {
    selectCategories().then(({ rows: categories }) => {
        res.status(200).send(categories)    
    })
}

module.exports = { getCategories };