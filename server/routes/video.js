import express from 'express';
import { addvideo , updatevideo,myVideos,  deletevideo, getvideo, increaseviews, trendvideos, randomvideos,subvideos, searchbytitle, searchbytag  } from '../controllers/videos.js';
const router = express.Router()

import {auth} from './verifyToken.js'


//add video

router.post('/add', auth , addvideo)

//update video

router.put('/update/:id', auth , updatevideo)

//delete video

router.delete('/delete/:id', auth , deletevideo)



//get video

router.get('/find/:id' , getvideo)

//update views

router.put('/views/:id', increaseviews)

//trend videos

router.get('/trend', trendvideos)

//random videos

router.get('/random', randomvideos)

//subs videos

router.get('/sub', auth, subvideos)

//myvideos

router.get('/myvideos', auth, myVideos)


//search by title

router.get('/titlesearch', searchbytitle)

//search by tag

router.get('/tagsearch', searchbytag)










export default router;