import React, { useState } from 'react'
import './deletevideo.scss'
import CloseIcon from '@mui/icons-material/Close';
import { getDeletedVideos } from '../redux/videoSlice';
import { useSelector, useDispatch } from 'react-redux'
import CardVideoEdit from './CardVideoEdit';
import axios from 'axios'
const DeleteVideo = props =>  {

    const dispatch = useDispatch()
    
    const {currentUser} = useSelector((state)=>state.user)
    const {videosAfterDelete} = useSelector((state)=>state.video)
    const [deleted, setDeleted] = useState(false)
    
    const handleDelete = async () =>{
        const toDelete = await axios.get(`/video/find/${props.videoId}`)
        dispatch(getDeletedVideos(toDelete.data))
        await axios.delete(`/video/delete/${props.videoId}`)
        setDeleted(true)
        
        
        

    }

  return (
    <div className='deletevideo'>
         <div className="wrapper">
         <CloseIcon className='icon' onClick={props.handleClose} ></CloseIcon>
        

        {deleted ? (<div className='deleteSuccess'>
            <h1 >Video Deleted Succesfully</h1>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            </div>) : (<><h1>Are you sure?</h1>
            <p>You won't be able to revert this</p>
          
          
          
          <button type="submit" onClick={handleDelete}>Yes, Delete it!</button>
          <button  onClick={props.handleClose}>Cancel</button></>)}
          
        </div>
    
    </div>
  )
}




export default DeleteVideo;
