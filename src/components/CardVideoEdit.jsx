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

    const {currentVideoUpdate} = useSelector((state)=>state.video)
    const [openUpd, setOpenUpd] = useState(false)
   
    
    let postUpdate = {}
    video._id == currentVideoUpdate?._id ? postUpdate = currentVideoUpdate : postUpdate = video
    const dispatch = useDispatch()
    const togglePopupUpd = () => {
        setOpenUpd(!openUpd);
      }

     

      const handleDelete = async () =>{
        
        
        await axios.delete(`/video/delete/${videoId}`)
        
        
        
        

    }
     
      const togglePopupDel = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                    handleDelete()
              Swal.fire(
                'Deleted!',
                'Your Video has been deleted.',
                'success'
              )
            }
          })
      }


    

  

  
  return (
    <>
       
    <div className={'cardvideoedit ' + (dotsClicked ? 'activeCard' : '')} >
    
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
                
                
</>
           
  )
}
