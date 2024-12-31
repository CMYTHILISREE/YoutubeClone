import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:true
  }


});
const commentModel=mongoose.model('comments_model',commentSchema)
export default commentModel