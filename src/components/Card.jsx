
import React from 'react'

import { Link } from "react-router-dom";

import { format} from "timeago.js";
import { useState , useEffect} from "react";
import axios from 'axios'

import './card.scss'


export default function Card({isDark, setDark, video}) {

    const [user, setUser] = useState({})

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`/user/find/${video.userId}`)
      setUser(res.data)

    }
    fetchUser()

  }, [video.userId]) //dependecies
  return (
    <Link to={`/video/${video._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
    
    <div  className='card'>
        <div className='vid'>
            <img  src={video.imgUrl} alt=""></img>
                 <div className='details'>
                <img  src ={user.profileimg} className='channel'   alt=""></img>
                <div className={ 'texts ' + (isDark ? 'dark' : '')}>
                    <p className='overflow-wrap'>{video.title}</p>
                  
                    <p className='channelname'>{user.username}</p>
                   
                    <div className="info">
                        {video.views} views . {format(video.createdAt)}
                        
                    </div>

                </div>   
            </div>
        </div>
    </div>
    </Link>
 
  )
}
