const express=require("express");
const Postmodal = require("../modal/post");
const router=express.Router();
const multer=require("multer");


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

router.post("",multer({storage:storage}).single("image"), (req, res, next) => {
  const url=req.protocol + '://' + req.get("host");
  const post = new Postmodal({
    title: req.body.title,
    content: req.body.content,
    imagePath:url+ "/images/" + req.file.filename
  });
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
router.put("/:id", (req, res, next) => {
  const post = new Postmodal({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(`updated`);
    res.status(200).json({ message: "updated successfully" });
  });
});
router.get("", (req, res, next) => {
  Postmodal.find().then((documents) => {
    console.log(documents);

    res.json({
      message: "from express server",
      posts: documents,
    });
  });
});
router.delete("/:id", (req, res, next) => {
  Postmodal.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "successfully Deleted",
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

module.exports=router
