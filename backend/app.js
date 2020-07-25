const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes=require("./routes/posts");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Haroon:n58ihxuME0p94thz@mean-db-cluster.qdumj.mongodb.net/mean-db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("error");
  });

app.use(bodyParser.json());

app.use((res, req, next) => {
  req.setHeader("Access-Control-Allow-Origin", "*");
  req.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  req.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});
//WKtRX1heWC4dfRFG

app.use("/api/posts",postRoutes)
module.exports = app;
