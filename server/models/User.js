import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    username:{
        type: String,
        required:true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required:true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
       // required:true,
        max: 1024,
        min: 6

    },

    fromGoogle:{
        type:Boolean,
        default:false
    },

    profileimg:{
        type:String,
       
    },
    subscribes:{
        type:Number,
        default:0,
    },
    subscribedUsers:{
        type:[String],
    },
},
    {timestamps:true},


    
    
)



export default mongoose.model('User', userSchema)