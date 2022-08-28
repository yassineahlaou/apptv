import Video from '../models/Video.js';
import User from '../models/User.js';

import Comment from '../models/Comment.js';



export const addvideo = async (req, res) => {
    const newvideo = new Video ({
      userId : req.user._id,
      ...req.body //solution if we have a lot of props

    })

    //save user
    try {
        const savedVideo = await newvideo.save()
        res.send(savedVideo)
        //res.send({user: user._id})
        
    } catch (error) {
        res.status(400).send(error)
  
    }


}

export const updatevideo = async (req, res) => {

    const videoId = req.params.id
    const {title, desc, imgUrl, videoUrl, tags} =  req.body // names of parameters should not be different than the names in database
    
    try{
    let foundVideo = await Video.findById(videoId) 

    if(req.user._id === foundVideo.userId){
       
        foundVideo = await Video.findOneAndUpdate({_id: videoId}, req.body , {new: true})

        res.send(`Video with id ${videoId}  has been updated` )

    }
    else{res.send('you cant update this video')}
} catch (error) {
    res.status(400).send(error)

}
}


export const deletevideo = async (req, res) => {
    const videoIdd = req.params.id
    let foundVideo = await Video.findById(videoIdd) 
    
    const comments = await Comment.find({videoId:videoIdd})
    
    res.send(`Video  with id ${videoIdd} is deleted from database`)
    for (var i=0;i<comments.length;i++){
        
        await Comment.findByIdAndDelete({_id: comments[i]._id})

    }


    foundVideo = await Video.findOneAndRemove({_id: videoIdd})
   
   
    
}
export const getvideo = async (req, res) => {

    const videoId = req.params.id
     
    const foundVideo = await Video.findById(videoId)
    
    res.send(foundVideo)
   

    

    
}

export const myVideos = async (req, res) => {

    const loggedUser = req.user._id
     
    const videos = await Video.find({userId: loggedUser}).sort({createdAt : -1})
    
    res.send(videos)
   

    

    
}

export const increaseviews = async (req, res) => {

    const  videoRefresh = await Video.findByIdAndUpdate( req.params.id ,{
        $inc: {views : 1}, });

        res.send(videoRefresh)
}
export const trendvideos = async (req, res) => {

   
    
    const videos = await Video.find().sort({views : -1}) // -1: means DESC 1: means ASC
    
    res.send(videos)


    
}
export const randomvideos = async (req, res) => {
    const videos = await Video.aggregate([{$sample: {size: 40}}]);

    res.send(videos)
}
export const subvideos = async (req, res) => {

    try {

    const loggedUser = await User.findById(req.user._id)

    
    const subscribedChannels = loggedUser.subscribedUsers;
    //console.log(subscribedChannels)
    let videos = []

    for (var i=0; i<subscribedChannels.length; i++){

        const video = await Video.find({userId: subscribedChannels[i]})
        videos.push(video)
        

    }



    res.send(videos.flat().sort((a,b)=>b.createdAt - a.createdAt))//flat() remove nested array, sort() javascript sorting
    }
    catch(error){
        res.status(400).send(error)

    }

    


    
}

export const searchbytitle = async (req, res) => {

    const query = req.query.q  
    const videos = await Video.find({title:{$regex: query , $options:"i"}}).limit(40)
    res.send(videos)

    //


}

export const searchbytag = async (req, res) => {

    const tags = req.query.tags.split(',')
    const videos = await Video.find({tags: {$in : tags}}).limit(20).sort({createdAt : -1})
    res.send(videos)

}
