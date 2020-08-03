const express=require("express");
const router=express.Router();
const User=require("../modal/user");
const bcrypt=require("bcrypt");

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
module.exports=router;
