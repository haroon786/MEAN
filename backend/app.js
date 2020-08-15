const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes=require("./routes/posts");
const userRoutes=require("./routes/user");

const app = express();
const path = require("path");
mongoose
  .connect(
    "mongodb+srv://Haroon:"+process.env.MONGO_ATLAS_PW+"@mean-db-cluster.qdumj.mongodb.net/mean-db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));

app.use((res, req, next) => {
  req.setHeader("Access-Control-Allow-Origin", "*");
  req.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  req.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});
//WKtRX1heWC4dfRFG

app.use("/api/posts",postRoutes)
app.use("/api/user",userRoutes)
module.exports = app;
