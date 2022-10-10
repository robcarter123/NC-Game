const { selectCategories } = require("../models/model");

const getCategories = (req,res,next) => {
    selectCategories().then(({ rows: categories }) => {
        res.status(200).send(categories)    
    })
}

module.exports = { getCategories };