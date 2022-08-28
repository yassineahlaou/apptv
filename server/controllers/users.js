import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import Video from '../models/Video.js';
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { registrationValidation , loginValidation, updateValidation, updatePasswordValidation, forgotPasswordVal} from '../validation.js';

import {auth} from '../routes/verifyToken.js'
//reister
export const createUser = async (req, res) => {

    //data validation
    const {error} = registrationValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}

    //check if user is already in database

    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) {return res.status(400).send('This email already exists!')}
    const usernameExist = await User.findOne({username: req.body.username})
    if (usernameExist) {return res.status(400).send('This username already exists!')}

    //hash the password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    
    const user = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        profileimg: req.body.profileimg,

    })

    //save user
    try {
        const savedUser = await user.save()
        res.send(savedUser)
        //res.send({user: user._id})
        
    } catch (error) {
        res.status(400).send(error)
  
    }
 }

//login

export const loginUser = async (req, res) => {
    //data validation
    const {error} = loginValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}

    //check if email is already in database

    const userLog = await User.findOne({email: req.body.email})
    if (!userLog) {return res.status(400).send('Email not found!')}

    //check if password is correct 
    const passwordMatched = await bcrypt.compare(req.body.password, userLog.password)
    if (!passwordMatched){return res.status(400).send('Wrong Password!')}
    

    //create token jwt , as a security mesure that the user is logged in

    const token = jwt.sign({_id: userLog._id}, process.env.TOKEN_SECRET)
    res.cookie('authtoken', token, { httpOnly: true }).send(userLog)
    
    



}


export const googleAuth = async (req, res) => {

    
    const userLog = await User.findOne({email: req.body.email})
    if ( userLog) {
        const token = jwt.sign({_id: userLog._id}, process.env.TOKEN_SECRET)
        res.cookie('authtoken', token, { httpOnly: true }).send(userLog)
    }
    else{
        const newUser = new User ({
            ...req.body,
            fromGoogle:true
    
        })
        try {
            const savedUser = await newUser.save()
            res.send(savedUser)
            //res.send({user: user._id})

            
            
        } catch (error) {
            res.status(400).send(error)
      
        }

        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET)
        res.cookie('authtoken', token, { httpOnly: true }).send(savedUser)



    }

   


    


}


 /*export const getUsers = (req, res) =>
 {
     
     res.send("working")
 }*/

 export const getUser = async (req, res)=>{
    const userId = req.params.id
    
    const foundUser = await User.findById(userId)
    
    res.send(foundUser)

}

export const deleteUser = async (req, res)=>{
    const userId = req.params.id
    let foundUser = await User.findById(userId) 

    res.send(`User with id ${userId} is deleted from database`)
   
    foundUser = await User.findOneAndRemove({_id: userId})
    
}


export const updatePassword = async (req,res) =>{
    const userId = req.params.id
    let foundUser = await User.findById(userId) 
    const {error} = updatePasswordValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}
    const passwordMatched = await bcrypt.compare(req.body.oldpassword, foundUser.password)
    if (!passwordMatched){return res.status(400).send('Old password wrong!')}

    if (req.body.password != req.body.rewrite){return res.status(400).send('Rewritten Password doesnt match')}
    


    

    //hash the password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashedPassword)
    req.body.password = hashedPassword

    foundUser = await User.findOneAndUpdate({_id: userId}, req.body , {new: true})
    const userLoggedIn = await User.findById( req.user._id )
    
    
   
    res.send('password changed')
}


export const forgotPassword = async (req, res) =>{
   const {error} = forgotPasswordVal(req.body)
    if (error){return res.status(400).send(error.details[0].message)}
    const userEmail = req.body.email
    let  userFound = await User.findOne({email:userEmail})

    if (!userFound) {return res.status(400).send('No User with this Email!')}
    if (req.body.password != req.body.confirm){return res.status(400).send(' Passwords doesnt match')}
   
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    req.body.password = hashedPassword

    userFound = await User.findOneAndUpdate({email: userEmail}, req.body , {new: true})

    res.send('New password Assigned to Account')

}


export const updateUser =  async (req, res) => {
   
    const userId = req.params.id
    const {username, email, password} =  req.body // names of parameters should not be different than the names in database
    const {error} = updateValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}
    let foundUser = await User.findById(userId) 
    /*if(username){
        foundUser.username = username
    }
    if(email){
        foundUser.email = email
    }
    if(password){
        foundUser.password = password
    }*/
    foundUser = await User.findOneAndUpdate({_id: userId}, req.body , {new: true})

    res.send(`User with id ${userId}  has been updated` )

}

export const logout =  async  (req, res) => {
    const userLoggedIn = await User.findById( req.user._id )
    
    res.clearCookie('authtoken')
    res.send(`GoodBye ${userLoggedIn.username} !!`)
    

}

export const subscribe =  async (req, res) => {
    let userLogged = await User.findByIdAndUpdate( req.user._id ,{
    $push: {subscribedUsers : req.params.idchannel}, });

    let userSubscribedto= await User.findByIdAndUpdate( req.params.idchannel ,{
        $inc: {subscribes : 1}, });

    /*const userLogged = User.findById( req.user._id)
    const userSubscribedto = User.findById( req.params.idchannel)*/
        
    
       // console.log(userLogged.subscribedUsers.length)
    res.send(`nice ${userLogged.username} has subsribed to ${userSubscribedto.username} , and ${userSubscribedto.username} has ${userSubscribedto.subscribes + 1} subsribers `)
    
}

export const unsubscribe =  async (req, res) => {
    let userLogged = await User.findByIdAndUpdate( req.user._id ,{
        $pull: {subscribedUsers : req.params.idchannel}, });
    
        let userSubscribedto= await User.findByIdAndUpdate( req.params.idchannel ,{
            $inc: {subscribes : -1}, });
    
        /*const userLogged = User.findById( req.user._id)
        const userSubscribedto = User.findById( req.params.idchannel)*/
            
        
    
        res.send(`nice ${userLogged.username} has unsubsribed to ${userSubscribedto.username} , and ${userSubscribedto.username} has ${userSubscribedto.subscribes - 1} subsribers `)
   
}
export const like =  async (req, res) => {

    
    const videoId = req.params.videoId

    const userId = req.user._id

    const loggedUser = await User.findById(userId)
    const founddVideo = await Video.findById(videoId)
    

    if (founddVideo.dislikes.includes(userId)){
        let videoUnDisLiked = await Video.findByIdAndUpdate( videoId ,{
            $pull: {dislikes : userId}, });

    let videoLiked = await Video.findByIdAndUpdate( videoId ,{
        $push: {likes : userId}, });

        res.send(`User ${loggedUser.username} has liked video with id ${videoLiked._id} and removed dislike`)
    }
    else{
        let videoLiked = await Video.findByIdAndUpdate( videoId ,{
            $push: {likes : userId}, });
    
            res.send(`User ${loggedUser.username} has liked video with id ${videoLiked._id}`)

    }

}
export const unlike =  async (req, res) => {
    let videoId = req.params.videoId
    const userId = req.user._id

    const loggedUser = await User.findById(userId)

    let videoUnLiked = await Video.findByIdAndUpdate( videoId ,{
        $pull: {likes : userId}, });

        res.send(`User ${loggedUser.username} has unliked video with id ${videoUnLiked._id}`)


}

export const dislike =  async (req, res) => {

    

    let videoId = req.params.videoId
    const userId = req.user._id

    const loggedUser = await User.findById(userId)
    const foundVideo = await Video.findById(videoId)

    if(foundVideo.likes.includes(userId)){
        let videoUnLiked = await Video.findByIdAndUpdate( videoId ,{
            $pull: {likes : userId}, });

    let videoDisLiked = await Video.findByIdAndUpdate( videoId ,{
        $push: {dislikes : userId}, });

        res.send(`User ${loggedUser.username} has disliked video with id ${videoDisLiked._id} and removed like`)
    }
    else{
        let videoDisLiked = await Video.findByIdAndUpdate( videoId ,{
            $push: {dislikes : userId}, });
    
            res.send(`User ${loggedUser.username} has disliked video with id ${videoDisLiked._id}`)
    }


}
export const undislike =  async (req, res) => {

    
    let videoId = req.params.videoId
    const userId = req.user._id

    const loggedUser = await User.findById(userId)

    let videoUnDisLiked = await Video.findByIdAndUpdate( videoId ,{
        $pull: {dislikes : userId}, });

        res.send(`User ${loggedUser.username} has undisliked video with id ${videoUnDisLiked._id}`)

}
