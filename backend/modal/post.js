const mongoose=require('mongoose');
const { stringify } = require('querystring');
const postSchems=mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    imagePath:{type:String,require:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref :"User",required:true}
})

module.exports=mongoose.model('post',postSchems);
