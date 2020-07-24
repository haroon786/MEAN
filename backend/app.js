const express=require('express');
const Postmodal=require('./modal/post');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const app=express();

mongoose.connect("mongodb+srv://Haroon:n58ihxuME0p94thz@mean-db-cluster.qdumj.mongodb.net/mean-db?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
  console.log("database connected");
 })
  .catch(()=>
  {
      console.log("error")
  })

app.use(bodyParser.json());

app.use((res,req,next)=>{
    req.setHeader("Access-Control-Allow-Origin","*");
    req.setHeader("Access-Control-Allow-Headers",
                "Origin,X-Requested-With,Content-Type,Accept");
    req.setHeader("Access-Control-Allow-Methods",
                "GET,POST,PATCH,DELETE,OPTIONS");
                next();
})
//WKtRX1heWC4dfRFG
app.post("/api/posts", (req, res, next) => {
  const post = new Postmodal({
    title: req.body.title,
    content: req.body.content
  });
    post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/Posts",(req,res,next)=>
{
  Postmodal.find().then(documents=>
    {
      console.log(documents)

      res.json({
            message:"from express server",
            posts:documents
      })
    })
})
app.delete("/api/Posts/:id",(req,res,next)=>{
  Postmodal.deleteOne({_id:req.params.id})
  .then(result=>{
    console.log(result);
    res.status(200).json(
      {
        message:"successfully Deleted"
      }
    );
  })


});

module.exports=app
