const express=require("express");
const Postmodal = require("../modal/post");
const router=express.Router();

router.post("", (req, res, next) => {
  const post = new Postmodal({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});
router.put("/:id", (req, res, next) => {
  const post = new Postmodal({
    _id: req.id,
    title: req.title,
    content: req.content,
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
