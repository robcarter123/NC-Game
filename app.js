const express = require('express');
const cors = require('cors');
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getReviewsById, patchReviewsById, getCommentsByReviewId, postComment } = require("./controllers/reviews.controller");
const { getUsers } = require("./controllers/users.controller");
const { getReviews } = require("./controllers/reviews.controller");
const { handlePSQLErrors, handleCustomErrors, handleInternalErrors, handleInvalidRouteErrors } = require('./controllers/errors.controller');


app.use(express.json());
app.use(cors())
app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews", getReviews)
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId)

app.get("/api/users", getUsers);

app.patch("/api/reviews/:review_id", patchReviewsById);

app.post("/api/reviews/:review_id/comments", postComment);

app.all("*", handleInvalidRouteErrors);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;