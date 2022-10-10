const db = require("../db/connection.js")

const selectCategories = (req,res,next) => {
    return db.query(`SELECT * FROM categories`);
}

const selectReviewById = (review_id) => {
    return db
      .query(`SELECT * FROM reviews WHERE review_id=$1`, [review_id])
      .then(({ rows: [review] }) => {
        if (!review) {
          return Promise.reject({
            status: 404,
            message: `Review ${review_id} Not Found`,
          });
        }
        return review;
      });
  };


module.exports = { selectCategories, selectReviewById };