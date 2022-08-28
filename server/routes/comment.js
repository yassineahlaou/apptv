import express from 'express';
import { getComments, addComment, updateComment, deleteComment} from '../controllers/comments.js';
const router = express.Router()

import {auth} from './verifyToken.js'


//get all users

//router.get('/', getUsers)



//get all  comment

router.get('/getComment/:idvideo' , getComments)


//add commnet

router.post('/addComment/:idvideo',auth, addComment)


//update comment

router.put('/updateComment/:idcomment',auth, updateComment)

//deletecomment

router.delete('/deleteComment/:idcomment',auth, deleteComment)




export default router;