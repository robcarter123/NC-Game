const { selectCategories, selectReviewsById } = require("../models/model");

const getCategories = (req,res) => {
    selectCategories().then(({ rows: categories }) => {
        res.status(200).send(categories)    
    })
}

 const getReviewsById = (req, res, next) => {
    selectReviewById(req.params.review_id)
      .then((review) => {
        res.status(200).send({ review });
      })
      .catch(err => next(err));
  };

module.exports = { getCategories, getReviewsById };