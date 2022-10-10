const express = require('express');
const app = express();
const { getCategories, getReviewsById } = require("./controllers/controller");
// app.use(express.json());

app.get("/api/categories", getCategories);

app.get("api/reviews/:review_id", getReviewsById);

app.all("*", (req,res) => {
    res.status(404).send({message: "No Valid Endpoint"});
})

app.use((req, res, next) => {
    res.status(500).send({message: "Server Error"});
    next(err);
})

module.exports = app;