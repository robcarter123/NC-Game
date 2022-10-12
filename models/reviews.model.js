const db = require("../db/connection.js")

const selectReviewById = (review_id) => {

    return db
      .query(`SELECT reviews.*, (SELECT COUNT(*)::int FROM comments WHERE review_id=$1)
      AS comment_count FROM reviews WHERE review_id=$1;`,[review_id])
      .then(({ rows: [review] }) => {
        console.log(review)
        if (!review) {
          return Promise.reject({
            status: 404,
            message: `Review ${review_id} Not Found`,
          });
        } else {
        return review;
        }
      });
  };

const updatedReviewsById = (review_id, inc_votes) => {
  return db
  .query(`UPDATE reviews SET votes = votes + $1 WHERE review_id=$2 RETURNING *;`,
  [inc_votes, review_id])
  .then(({ rows: [review] }) => {
    if(!review) {
      return Promise.reject({
        status: 404,
        message: `Review ${review_id} Not Found`,
      })
    }
    return review;
  })


}

  module.exports = { selectReviewById, updatedReviewsById };