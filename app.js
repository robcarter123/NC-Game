const express = require('express');
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getReviewsById, patchReviewsById, postReviewComment } = require("./controllers/reviews.controller");
const { getUsers } = require("./controllers/users.controller");
const { handlePSQLErrors, handleCustomErrors, handleInternalErrors, handleInvalidRouteErrors } = require('./controllers/errors.controller');

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);
app.patch("/api/reviews/:review_id", patchReviewsById);
app.post("/api/reviews/:review_id/comments", postReviewComment)

app.get("/api/users", getUsers);



app.all("*", handleInvalidRouteErrors);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;