import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    
    userId:{
        type: String,
        required:true,
       
    },
    title:{
        type: String, 
        required:true,
        
    },  
    desc:{
        type: String,
        required:true,
        
  
    },
    imgUrl:{
        type: String, 
        

    },
    videoUrl:{
        type: String,
        required:true,

    },
    views:{
        type: Number,
        default:0,

    },
    tags:{
        type: [String],
        defaault: []
    },
    likes:{
        type: [String],
        defaault: []
    },
    dislikes:{
        type: [String],
        defaault: []
    },
    
},
{timestamps:true},
)



export default mongoose.model('Video', videoSchema)