const db = require("../db/connection.js")

const selectReviewById = (review_id) => {

    return db
      .query(`SELECT * FROM reviews WHERE review_id=$1;`, [review_id])
      .then(({ rows: [review] }) => {
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

const addReviewComment = (review_id, reqBody) => {
  const {username, body} = reqBody;
  return db
    .query(`INSERT INTO comments (body, review_id, author) VALUES ($1, $2, $3) RETURNING *`,
    [body, review_id, username])
    .then(({rows: [comment]}) => {
      console.log(comment)
      return comment;
    })
}

module.exports = { selectReviewById, updatedReviewsById, addReviewComment };