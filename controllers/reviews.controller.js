const { selectReviewById } = require("../models/reviews.model");


const getReviewsById = (req, res, next) => {
    selectReviewById(req.params.review_id)
      .then((review) => {
        res.status(200).send({ review });
      })
      .catch(next);
  };

  module.exports = { getReviewsById };
