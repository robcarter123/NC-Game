const express = require('express');
const app = express();
const { getCategories } = require("./controllers/controller");
app.use(express.json());

app.get("/api/categories", getCategories);

app.use((req, res, next) => {
    res.status(404).send({message: "No Valid Endpoint"});
    next(err);
})

module.exports = app;