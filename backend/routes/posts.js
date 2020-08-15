const express=require("express");
const userRoutes=require("../routes/user");
const router=express.Router();
const chekAuth=require("../middleware/check-auth");
const PostController=require("../controllers/post");
const extractFile=require("../middleware/file");

router.post("",chekAuth,extractFile,PostController.createPost);

router.put("/:id",chekAuth,extractFile,PostController.updatePost );
router.get("",PostController.getPosts );

router.get("/:id",PostController.getPost)
router.delete("/:id",chekAuth,PostController.deletePost);

module.exports=router
