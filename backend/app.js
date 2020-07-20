const express=require('express');
//const bodyParser=require("body-parser");
const app=express();

//app.use(bodyParser.json());

app.use((res,req,next)=>{
    req.setHeader("Access-Control-Allow-Origin","*");
    req.setHeader("Access-Control-Allow-Headers",
                "Origin,X-Requested-With,Content-Type,Accept");
    req.setHeader("Access-Control-Allow-Methods",
                "GET,POST,PATCH,DELETE,OPTIONS");
                next();
})
app.post("/api/posts/",(req,res,next)=>
{
  const post=req.body
  console.log(post);
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
