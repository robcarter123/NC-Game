const { selectCategories } = require("../models/model");

const getCategories = (req,res,next) => {
    console.log('inside the getCategories controller');
    selectCategories().then(({ rows: categories }) => {
        console.log(categories);
        res.status(200).send(categories)    
    })
}


module.exports = { getCategories };