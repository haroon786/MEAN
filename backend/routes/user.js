const express=require("express");
const router=express.Router();
const User=require("../modal/user");
const bcrypt=require("bcrypt");
const { route } = require("./posts");
const jwt=require("jsonwebtoken");



router.post("/signup",(req,res,next)=>{
bcrypt.hash(req.body.password,10)
.then(hash=>{
   const user=new User({
      email:req.body.email,
      password:hash
   });
    user.save()
    .then(result=>
      {
        res.status(201).json({
          message:'User Created',
          result:result
        });
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      })
})
const user=new User({
  email:req.body.email,
  password:req.body.password
});
});
router.post("/login",(req,res,next)=>{
  let fetchedUser;

  User.findOne({email:req.body.email}).then(user=>{
    if(!user)
      {
        return res.status(401).json({
          message:"Auth Failed"
      });
      }
      fetchedUser=user;
      console.log("user"+user);
      console.log("fethceduser"+fetchedUser)
      return bcrypt.compare(req.body.password,user.password);
  })
  .then(result=>
    {
      if(!result)
      {
        return res.status(401).json({
          message:"Auth Failed"
        })
      }

    console.log("ddddd"+fetchedUser)
    const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
      "secretly-created-json-token",{expiresIn:"1h"});
      res.status(201).json({
        token:token
      });
    })
    .catch(err=>
      {
        return res.status(401).json({
          message:"Auth Failed?"
        })
      })
})

module.exports=router;

