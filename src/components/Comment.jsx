import React from 'react'
import './comment.scss';
import { format} from "timeago.js";
import { useState , useEffect} from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
export default function Comment({isDark, setDark, comment}) {
  /*const {currentComment}  = useSelector((state) => state.comment);
  console.log(currentComment)*/
  const [user, setUser] = useState({})
 
  useEffect(()=>{
    const fetchUser = async ()=>{
      
      const resUser = await axios.get(`/user/find/${comment.userId}` )
      
      setUser(resUser.data)

    }
    fetchUser()

  }, [comment.userId])
  return (
    <div className='comment'>
      <img  src={user.profileimg} className='channel'   alt=""></img>

      <div className={"texts " + (isDark ? 'dark' : '')}>
        <div className="info">
           <h4>{user.username}</h4>
           <span>{format(comment.createdAt)}</span>
        </div>
        <div className="comm">
        {comment.content}
        </div>
      </div>
    </div>
  )
}
