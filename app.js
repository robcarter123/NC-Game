const express = require('express');
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getReviewsById } = require("./controllers/reviews.controller");
const { getUsers } = require("./controllers/users.controller");

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/users", getUsers);

app.all("*", (req,res) => {
    res.status(404).send({message: "No Valid Endpoint"});
})

app.use((err, req, res, next) => {
    if(err.code === "22P02") {
        res.status(400).send({ message: "Invalid Request"})
    } next(err);
})

app.use((err, req, res, next) => {
    if(err.status && err.message) {
        res.status(err.status).send({message: err.message});
    } else next(err);
})

app.use((err, req, res, next) => {
    res.status(500).send({message: "Server Error"});
    next(err);
});

module.exports = app;