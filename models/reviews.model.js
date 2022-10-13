const db = require("../db/connection.js");
const reviews = require("../db/data/test-data/reviews.js");

const selectReviews = (category) => {
  const catValues = [
    "euro_game",
    "social_deduction",
    "dexterity",
    "childrens_games",
  ];

  const queryValues = [];

  let qStr = `SELECT reviews.*, COUNT(comments.comment_id)::int as comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id=comments.review_id`;

  if(category) {
    if(!catValues.includes(category)){
    return Promise.reject({ status: 400, message: "Invalid Category"});
    }
    qStr += ` WHERE reviews.category=$1`;
    queryValues.push(category);
  }

  qStr += ` GROUP BY reviews.review_id
  ORDER BY reviews.created_at DESC;`;

return db
    .query(qStr, queryValues).then(( {rows: reviews }) => {
      console.log(qStr)
      console.log(queryValues)
      console.log(reviews)
      return reviews;
    })
  }

const selectReviewById = (review_id) => {
    return db
      .query(`SELECT reviews.*, (SELECT COUNT(*)::int FROM comments WHERE review_id=$1)
      AS comment_count FROM reviews WHERE review_id=$1;`,[review_id])
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

  module.exports = { selectReviewById, updatedReviewsById, selectReviews };