import express from 'express';
import { createUser, loginUser, updateUser,forgotPassword,googleAuth,updatePassword,deleteUser, getUser, subscribe, unsubscribe, like , dislike, logout, unlike, undislike} from '../controllers/users.js';
const router = express.Router()

import {auth} from './verifyToken.js'


//get all users

//router.get('/', getUsers)


//add user
router.post('/register', createUser )

//login

router.post('/login', loginUser )

//googlr auth

router.post('/google',googleAuth)

//logout

router.get('/logout', auth, logout)


//get one user

router.get('/find/:id', getUser)


//subscribe

router.put('/sub/:idchannel',auth, subscribe)


//unsubscribe

router.put('/unsub/:idchannel', auth,  unsubscribe)

//like

router.put('/like/:videoId', auth, like)

//dislike

router.put('/dislike/:videoId', auth, dislike)

//unlike

router.put('/unlike/:videoId', auth, unlike)


//undislike

router.put('/undislike/:videoId', auth, undislike)



//update one user
router.put('/update/:id', auth ,  updateUser)

//update password

router.put('/updatePassword/:id', auth, updatePassword)

//forgot password

router.put('/forgotPassword/', forgotPassword)

//delete user

router.delete('/delete/:id',auth,  deleteUser)


export default router;