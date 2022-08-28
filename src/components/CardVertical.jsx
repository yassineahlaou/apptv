import React from 'react'
import { useState , useEffect} from "react";

import './cardvertical.scss'
import { Link } from "react-router-dom";
import axios from 'axios'
import { format} from "timeago.js";


export default function CardVertical({isDark, setDark, recomd}) {
  const [user, setUser] = useState({})
  useEffect(()=>{
    const fetchUser = async ()=>{
     
      const resUser = await axios.get(`/user/find/${recomd.userId}`)
      setUser(resUser.data)
    }
    fetchUser()
  }, [recomd.userId])
  return (
    <Link to={`/video/${recomd._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <div className='cardvertical'>
            <div className='vid'>
                <img src={recomd.imgUrl} alt=""></img>
                <div className='details'>
               
                    <div className={'texts '+ (isDark ? 'dark' : '')}>
                        <p className='overflow-wrap'>{recomd.title}</p>
                        <p className='channelname'>{user.username}</p>
                    
                        <div className="info">
                            {user.subscribes} subs .  {format(recomd.createdAt)}
                            
                        </div>

                    </div>   
                </div>
            </div>
    </div>
    </Link>
  )
}
