import commentModel  from '../model/commentSchema.js'

export function getComment(req,res){
          commentModel.find().then((data)=>{
            if(!data){
              return res.status(404).send({message:"No data Found"});
            }
             res.status(200).send(data)
          }).catch((err)=>{
            res.status(503).send({message:"Internal server error"})
          })
}
export function postComment(req,res){
        const {userName,content}=req.body;
        const newComment=new commentModel({
                userName,
                content
        })
        newComment.save().then((data)=>{
            if(!data){
              return res.status(403).send({message:"Add the comment"})
            }
            return res.status(200).send({message:"Comments Added successfully",data:data})
        }).catch((err)=>{
          return res.status(503).send({message:err.message})
        })
}

export function updateComment(req,res){
     const id=req.params.id;
     const {content}=req.body;
     commentModel.findByIdAndUpdate(
         id,
         {content},
         {new:true,runValidators:true}
     ).then((data=>{
      if(!data){
        return res.status(403).send({message:"No data Exist"});
      }
      res.status(200).send({message:"Updated Successfully"})
     })).catch((err)=>{
      res.status(503).send({message:"Internal Server Error"})
     })
}
export function deleteComment(req,res){
  const id=req.params.id;
  commentModel.findByIdAndDelete(id).then((data)=>{
    if(!data){
      return res.status(403).send({message:"No data found"});
    }
    res.status(200).send({message:"Comments deleted successfully"});
  }).catch((err)=>{
    res.status(503).send({message:"Internal server error"});
  })
}