const User=require("../modal/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


exports.createUser=(req,res,next)=>{
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
            message:"Invalid authentication credentails"
          })
        })
  })
  const user=new User({
    email:req.body.email,
    password:req.body.password
  });
}

exports.userLogin=(req,res,next)=>{
  let fetchedUser;

  User.findOne({email:req.body.email}).then(user=>{
    if(!user)
      {
        return res.status(401).json({
          message:"login failed"
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
      process.env.JWT_KEY,{expiresIn:"1h"});
      res.status(201).json({
        token:token,
        expiresIn:3600,
        userId:fetchedUser._id
      });
    })
    .catch(err=>
      {
        return res.status(401).json({
          message:"Auth Failed?"
        })
      })
}
