import Video from '../models/Video.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';



export const getComments = async (req, res) => {
    const idVideo = req.params.idvideo
    const comments = await Comment.find({videoId:idVideo}).sort({createdAt: 'desc'})

    res.send(comments)
    
}
export const addComment = async (req, res) => {

    const newcomment = new Comment ({
        userId : req.user._id,
        videoId : req.params.idvideo,
        ...req.body //solution if we have a lot of props
  
      })
  
      //save user
      try {
          const savedComment = await newcomment.save()
          res.send(savedComment)
          //res.send({user: user._id})
          
      } catch (error) {
          res.status(400).send(error)
    
      }
  
    
}
export const updateComment = async (req, res) => {

    const commentId = req.params.idcomment
    
    
    try{
    let foundComment = await Comment.findById(commentId) 

    if(req.user._id === foundComment.userId){
       
        foundComment = await Comment.findOneAndUpdate({_id: commentId}, req.body , {new: true})

        res.send(`comment with id ${commentId}  has been updated` )

    }
    else{res.send('you cant update this video')}
} catch (error) {
    res.status(400).send(error)

}
    
}
export const deleteComment = async (req, res) => {

    const commentId = req.params.idcomment
    let foundComment = await Comment.findById(commentId) 

    res.send(`Comment with id ${commentId} is deleted from database`)
   
    foundComment = await Comment.findOneAndRemove({_id: commentId})
    
}

