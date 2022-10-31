const { selectReviewById, updatedReviewsById, selectReviews, selectCommentsByReviewId, addComment } = require("../models/reviews.model");


const getReviewsById = (req, res, next) => {
    selectReviewById(req.params.review_id)
      .then((review) => {
        res.status(200).send({ review });
      })
      .catch(next);
  };

const getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const promises = [
    selectCommentsByReviewId(review_id),
    selectReviewById(review_id),
  ]
  Promise.all(promises)
    .then(([comments, review]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
}

  const patchReviewsById = (req, res, next) => {
    updatedReviewsById(req.params.review_id, req.body.inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    }).catch(next);
  }

  const postComment = (req, res, next) => {
    addComment(req.params.review_id, req.body)
      .then((comment) => {
        res.status(201).send({ comment });
      })
      .catch(next);
  };

  module.exports = { getReviewsById, patchReviewsById, getReviews, getCommentsByReviewId, postComment };