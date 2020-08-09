const express=require("express");
const Postmodal = require("../modal/post");
const userRoutes=require("../routes/user");
const router=express.Router();
const multer=require("multer");
const chekAuth=require("../middleware/check-auth");

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error=new Error("invalid mime type");
    if(isValid)
    {
      error=null;
    }
    cb(error,"backend/image")
  },
  filename:(req,file,cb)=>
  {
    const name=file.originalname.toLowerCase().split('').join('-');
    const ext=MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now()+'.'+ext);
  }
})

router.post("",chekAuth,multer({storage:storage}).single("image"), (req, res, next) => {
  const url=req.protocol + '://' + req.get("host");
  const post = new Postmodal({
    title: req.body.title,
    content: req.body.content,
    imagePath:url+ "/images/" + req.file.filename,
    creator:req.userData.userId
  });
  console.log(req.userData);
  return res.status(200).json({});
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      post:{
        ...createdPost,
        id:createdPost._id
      }
    });
  });
});
router.put("/:id",chekAuth,multer({storage:storage}).single("image"), (req, res, next) => {
  let imagePath=req.body.imagePath;
  if(req.file){
    const url=req.protocol + "://" + req.get("host");
    imagePath=url+ "/images" + req.file.filename
  }
  const post = new Postmodal({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath:imagePath,
    creator:req.userData.userId
  });
  post.updateOne({ _id: req.params.id,creator:req.userData.userId}, post).then((result) => {
    console.log(`updated`);
    if(result.nModified>0)
    {
      res.status(200).json({message:"update successfully"});
     }
     else
     {
       res.status(401).json({
         message:"unsccessfull update"
       })
     }
  });
});
router.get("", (req, res, next) => {
  const pageSize=+req.query.pageSize;
  const currentPage=+req.query.page;
  const postquery=Postmodal.find();
  let fetchedPosts;
  if(pageSize && currentPage)
  {
    postquery.skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }
  postquery.then(documents=>{
    fetchedPosts=documents
    return Postmodal.countDocuments();
  })
    .then(count=>{
    res.status(200).json({
      message: "from express server",
      posts: fetchedPosts,
      maxPost:count
    });
  });
});

router.get("/:id",(req,res)=>
{
  Postmodal.findById(req.params.id).then(post=>
    {
      if(post)
      {
        res.status(200).json(post);
      }
      else{
          res.status(404).json({messag:"post not  found"})
      }
    }
    )
})
router.delete("/:id",chekAuth, (req, res, next) => {
  Postmodal.deleteOne({ _id: req.params.id ,creator:req.userData.userId}).then((result) => {

    if(result.n>0)
    {
      res.status(200).json({
        message: "Deletion successfully",
      });
    }
    res.status(401).json({
      message: "Not Authorized to Delete",
    });
  });
});



module.exports=router
