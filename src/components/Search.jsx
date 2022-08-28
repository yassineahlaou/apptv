import React from 'react'
import './main.scss'
import Card from './Card'
import axios from 'axios'
import { Link , useLocation} from "react-router-dom";
import { useState , useEffect} from "react";

export default function Search({isDark, setDark}) {
    const [videos, setVideos] = useState([])
    const query = useLocation().search
    console.log(query)
    useEffect(()=>{
        const fetchVideos = async ()=>{
         
          
          const res = await axios.get(`/video/titlesearch${query}` )
          setVideos(res.data)
         
          
          
    
        }
        fetchVideos()
        
    
      }, [query])
  return (
    <div className= {'main '  + (isDark ? 'dark' : '')}>
        {console.log(isDark)}
   
  {
   
    videos.map(video=>
     <Card key={video._id} video={video} isDark={isDark}  setDark={setDark}></Card>
    )
    }
  </div>
  )
}
