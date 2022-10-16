const { selectReviewById, updatedReviewsById, addReviewComment } = require("../models/reviews.model");


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

  const postReviewComment = (req, res, next) => {
    addReviewComment(req.params.review_id, req.body)
      .then((comment) => {
        res.status(201).send({comment})
      })
      .catch(next);
  }

module.exports = { getReviewsById, patchReviewsById, postReviewComment };
