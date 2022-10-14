const { getCategories } = require("../controllers/categories.controller.js");
const db = require("../db/connection.js");
const { selectCategories } = require("./categories.model.js");

const selectReviews = (category) => {
  
  const queryValues = [];

  let qStr = `SELECT reviews.*, COUNT(comments.comment_id)::int as comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id=comments.review_id`;

  if(category){
    qStr += ` WHERE reviews.category=$1`
    queryValues.push(category)
  }

  qStr += ` GROUP BY reviews.review_id ORDER BY created_at DESC`

  const nextVal = [db.query(qStr, queryValues)];

  if(category){
    const nextQuery = db.query(`SELECT * FROM categories WHERE slug=$1`, queryValues);
    nextVal.push(nextQuery)
  }
  return Promise.all(nextVal).then((result) => {
    const reviews = result[0].rows;
    let categories
    if(category) {
        categories = result[1].rows;
    }

    console.log(categories, reviews);

    if(reviews.length === 0) {
      if(categories.length === 0) {
        return Promise.reject({ status: 404, message: "Category Not Found"})
      }
      return reviews
    }
    return reviews
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