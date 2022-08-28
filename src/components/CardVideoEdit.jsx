import React from 'react'
import { Link } from "react-router-dom";

import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { format} from "timeago.js";
import './cardvideoedit.scss';
import { useState , useEffect} from "react";
import UpdateVideo from './UpdateVideo';
import { useSelector, useDispatch } from 'react-redux'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteVideo from './DeleteVideo';

export default function CardVideoEdit({video, videoId}) {
    const[dotsClicked , setDotsClicked] = useState(false)
    const {currentVideo} = useSelector((state)=>state.video)
    const {deletedVideo} = useSelector((state) => state.video)
    const {currentVideoUpdate} = useSelector((state)=>state.video)
    const [openUpd, setOpenUpd] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const [videoTodeleteId, setVideoToDelete] = useState(false)
    let postUpdate = {}
    video._id == currentVideoUpdate?._id ? postUpdate = currentVideoUpdate : postUpdate = video
    
    const togglePopupUpd = () => {
        setOpenUpd(!openUpd);
      }
     
      const togglePopupDel = () => {
        setOpenDel(!openDel);
      }


    

  

  
  return (
    <>
       
    <div className={deletedVideo._id != video._id ? ('cardvideoedit ' + (dotsClicked ? 'activeCard' : '')) : ('dis')} >
    
               <img  src={postUpdate.imgUrl} alt=""></img>
                 
                    <div className="header">
                        <p className='overflow-wrap'>{postUpdate.title}</p>
                        <div  className="container" >
                        <OutsideClickHandler  onOutsideClick={()=>setDotsClicked(false)}>  <MoreVertIcon  onClick={()=>setDotsClicked(true)} className="button"></MoreVertIcon></OutsideClickHandler>
                            <div className={'dropdown ' + ( (!dotsClicked) ? 'hide' : '')} >
              
                                <ul>
                                    
                                <Link to={`/video/${video._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                    <li onClick={()=>setDotsClicked(!dotsClicked)} >View Video</li>
                                    </Link>
                                    <hr></hr>
                                    <li  onClick={togglePopupUpd}  >Update Video</li>
                                    <hr></hr>
                                    
                                    <li onClick={togglePopupDel}>Delete Viideo</li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                   
                    <div className="info">
                        Uploaded : {format(postUpdate.createdAt)}
                        <br></br>
                       Views :  {postUpdate.views} 
                        <br></br>
                       Likes :  {postUpdate.likes?.length}
                       <br></br>
                       Dislikes :  {postUpdate.dislikes?.length}
                    </div>

                </div>   
                
                {openUpd && <OutsideClickHandler  onOutsideClick={()=>setOpenUpd(false)}> <UpdateVideo  handleClose={togglePopupUpd} videoId={videoId}/> </OutsideClickHandler>}
                {openDel && <OutsideClickHandler  onOutsideClick={()=>setOpenDel(false)}> <DeleteVideo  handleClose={togglePopupDel} videoId={videoId}/> </OutsideClickHandler>}
                
</>
           
  )
}
