import React from 'react'
import './comments.scss';

import { useState } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { uploadStart,uploadSuccess, uploadFailure, getComments } from '../redux/commentSlice';



export default function Comments({isDark , setDark,currentVideo}) {
    const [isButton, setButton]= useState(false)
    const [content, setContent] = useState("")
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const addComment = async(e)=>{
      e.preventDefault()
    dispatch(uploadStart())
    try{
    const resContent = await axios.post(`/comment/addComment/${currentVideo._id}`, {content})
   dispatch(uploadSuccess(resContent.data))
   const resComments = await axios.get(`/comment/getComment/${currentVideo._id}` )
  // console.log(resComments.data)
  
     
   dispatch(getComments(resComments.data))
    }
    catch(error){
      dispatch(uploadFailure())

    }

    setContent("")
  }
  return (
    <div className={'comments ' + (isDark ? 'dark' : '')}>
         <img src ={currentUser?.profileimg} className='channel'   alt=""></img>
         <div className="process">
                 <textarea name="content" className={(isDark ? 'dark' : '')} id="content" placeholder='add a comment' type="text" onClick={()=>setButton(true)} value={content} onChange={(e)=>setContent(e.target.value)}></textarea>

                <div className={'buttons ' + (isButton ? 'active' : 'inactive' )}>
                        <button className='add' type="submit" onClick={addComment} >Add Comment</button>
                        <button onClick={()=>setButton(false)} className={"cancel " + (isDark ? 'dark' : '')}>Cancel</button>
                </div>
         </div>
    </div>

  )
}
