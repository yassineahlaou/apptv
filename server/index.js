import express from "express";

import dotenv from "dotenv";

import mongoose from "mongoose"

import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'

import bodyParser from "body-parser"

import cookieParser  from 'cookie-parser'

import cors from 'cors'









//create our app

const app = express()

//handel connection between server and client to fetch data
app.use(cors({ origin:true, credentials:true })) 



//bodyParser

app.use(express.json());
app.use(cookieParser())


//load config
dotenv.config({path: './config/config.env'})

//connect db 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,}, () => console.log('connected to Database'))




//routes

app.use('/user', userRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentRoutes)

//start app


const PORT = process.env.PORT ;

app.listen(PORT, 
    console.log(`Started application on port ${PORT}`)
    );