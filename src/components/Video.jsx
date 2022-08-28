import React from 'react'
import Comments from './Comments'
import './video.scss';
import { Link , useLocation} from "react-router-dom";
import { useState , useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Comment from './Comment';
import CardVertical from './CardVertical';
import axios from 'axios'
import { format} from "timeago.js";
import { fetchStart, fetchSuccess, unlike, like, dislike, undislike, increaseViews } from '../redux/videoSlice';
import { uploadStart,uploadSuccess, uploadFailure, getComments } from '../redux/commentSlice';
import { subscription } from '../redux/userSlice';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { BsWindowSidebar } from 'react-icons/bs';

export default function Video({isDark, setDark}) {

  const {currentUser} = useSelector((state)=>state.user)
  const {currentVideo}  = useSelector((state) => state.video);
  const {commentsArray}  = useSelector((state) => state.comment);
  //console.log(commentsArray)
  
  
  const dispatch = useDispatch();
  const videoId = useLocation().pathname.split("/")[2]
  const [user, setUser] = useState({})
  const [recomds, setRecomds] = useState([])
  //const [comments, setComments] = useState([])
  //setComments(commentsArray)





//window.addEventListener('load' , incViews())
//incViews()

  
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch(fetchStart())
     
      const resVideo = await axios.put(`/video/views/${videoId}`)
      //const resVideo = await axios.get(`/video/find/${videoId}`)

     // console.log(resVideo.data.views)
     
    
      const resUser = await axios.get(`/user/find/${resVideo.data.userId}`)
      const resComments = await axios.get(`/comment/getComment/${videoId}` )
      //console.log(resComments.data)
      const resRecom = await axios.get(`/video/tagsearch?tags=${resVideo.data.tags}`)
        setRecomds(resRecom.data)
      dispatch(getComments(resComments.data))

        
        
       
      setUser(resUser.data)
     // setComments(resComments.data)
      try{
       
      dispatch(fetchSuccess(resVideo.data));
      
      
      
      }
      catch(error){
        console.log(error.data)
      }
    }
    fetchData()
    
    //setCount(videoFound.likes.length)

  }, [videoId, dispatch]) //dependecies


  



  const handleLike = async () =>{
    if (currentVideo?.likes?.includes(currentUser?._id)){
      await axios.put(`/user/unlike/${currentVideo._id}`);
      dispatch(unlike(currentUser._id));


    }
    else{
      await axios.put(`/user/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));

    }


  }

  const handleDisLike = async () =>{
    if (currentVideo?.dislikes?.includes(currentUser?._id)){
      await axios.put(`/user/undislike/${currentVideo._id}`);
      dispatch(undislike(currentUser._id));


    }
    else{
      await axios.put(`/user/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));

    }

    
  }

  const handlesub = async () =>{
    if (currentUser?.subscribedUsers?.includes(user?._id)){
      await axios.put(`/user/unsub/${user._id}`);
      dispatch(subscription(user._id));

    }
    else{
      await axios.put(`/user/sub/${user._id}`);
      dispatch(subscription(user._id));

    }

  }

  return (
    <div  className={'video ' + (isDark ? 'dark' : '')} >
      
      <div className="content">
        
        <video  src={currentVideo?.videoUrl}  controls> </video>
       <div className='intro'>
        <div className="info">
        
          <h1>{currentVideo?.title}</h1>
          <span >
          {currentVideo?.views} views . {format(currentVideo?.createdAt)}
        

          </span>   
          </div>
         
        
           
         
          <div className="buttons">
  
            <button onClick={handleLike} className={(isDark ? 'dark' : '')}>
              {currentVideo?.likes?.includes(currentUser?._id) ?  <ThumbUpAltIcon className='icon'></ThumbUpAltIcon> :  <ThumbUpOffAltIcon className='icon'></ThumbUpOffAltIcon> }{currentVideo?.likes?.length} 
             
              </button>
              <button onClick={handleDisLike} className={(isDark ? 'dark' : '')}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDownAltIcon className='icon'></ThumbDownAltIcon> : <ThumbDownOffAltIcon className='icon'></ThumbDownOffAltIcon> }Dislike
             
              </button>
            <button className={(isDark ? 'dark' : '')}><ShareIcon className='icon'></ShareIcon>Share</button>
            <button className={(isDark ? 'dark' : '')}><DownloadIcon className='icon'></DownloadIcon>Download</button>

         
        </div>
        </div>
        <hr></hr>

        <div className="more">

            <img  src={user.profileimg} className='channel'   alt=""></img>
            <div className='texts'>
                   
                    <h4>{user.username}</h4>
                   
                    <div className="info">
                        {user.subscribes} subs 
                        
                    </div>
                    <div className="description">
                            {currentVideo?.desc}
                    </div>
             </div>
             
             {currentUser?.subscribedUsers?.includes(user._id)? <button onClick={handlesub} className='unsub'>UnSubscribe</button > : <button onClick={handlesub} className='sub' >Subscribe</button>}
        </div>
        <hr></hr>

        <Comments key={currentVideo?._id}  currentVideo={currentVideo} isDark={isDark}  setDark={setDark}></Comments>
      
        {commentsArray?.map(comment=>
        <Comment  key={comment._id}  comment={comment} isDark={isDark}  setDark={setDark}></Comment>
          )}
        
       
        



      </div>
      <div className="recommendation">
        {recomds?.map(recomd=>
        <CardVertical key={recomd._id} recomd={recomd} isDark={isDark}  setDark={setDark}></CardVertical>
        )}
      </div>
      

    </div>
  )
}
