const express=require("express");
const userRoutes=require("../routes/user");
const router=express.Router();
const multer=require("multer");
const chekAuth=require("../middleware/check-auth");
const PostController=require("../controllers/post");
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

router.post("",chekAuth,multer({storage:storage}).single("image"),PostController.createPost);

router.put("/:id",chekAuth,multer({storage:storage}).single("image"),PostController.updatePost );
router.get("",PostController.getPosts );

router.get("/:id",PostController.getPost)
router.delete("/:id",chekAuth,PostController.deletePost);

module.exports=router
