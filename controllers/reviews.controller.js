const { selectReviewById, updatedReviewsById } = require("../models/reviews.model");


const getReviewsById = (req, res, next) => {
    selectReviewById(req.params.review_id)
      .then((review) => {
        res.status(200).send({ review });
      })
      .catch(next);
  };

  const patchReviewsById = (req, res, next) => {
    updatedReviewsById(req.params.review_id, req.body.inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    }).catch(next);
  }

  module.exports = { getReviewsById, patchReviewsById };
