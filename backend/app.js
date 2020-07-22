const express=require('express');
const Postmodal=require('./modal/post');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const app=express();

mongoose.connect("mongodb+srv://Haroon:n58ihxuME0p94thz@mean-db-cluster.qdumj.mongodb.net/mean-db-cluster?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true })
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
app.post("/api/posts/",(req,res,next)=>
{
  //const post=req.body
  const postmodal=new Postmodal({
    title:req.body.title,
    content:req.body.content
  })
  console.log(postmodal);
  res.status(201).json({
    message:"post added successfully"
  });
})
app.use("/api/Posts",(req,res,next)=>
{
      const Posts=[
        {
          id:"12",
          title:"First",
          content:"First Content"
        },
        {
          id:"12",
          title:"Second",
          content:"Second Content"
        },
        {
          id:"12",
          title:"Third",
          content:"Third Content"
        }
      ];
      res.json({
            message:"from express server",
            posts:Posts
      })
})

module.exports=app
