import { deleteComment, getComment, updateComment } from "../controllers/commentController.js";
import { postComment } from "../controllers/commentController.js";
export  function commentRoute(app){

  app.get('/get-comment',(req,res)=>{
    getComment(req,res)
  })
  app.post('/post-comment',(req,res)=>{
    postComment(req,res)
  })
  app.put('/update-comment/:id',(req,res)=>{
    updateComment(req,res)
  })
  app.delete('/delete-comment/:id',(req,res)=>{
    deleteComment(req,res)
  })

}