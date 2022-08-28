import React from 'react'
import Card from './Card'
import { useState , useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './main.scss'
import { searchedVideos } from '../redux/videoSlice';
export default function Main({isDark, setDark, type}) {

  const [videos, setVideos] = useState([])

  const {searched} = useSelector((state)=>state.video)
  
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchVideos = async ()=>{
     
      
      const res = await axios.get(`/video/${type}` )
      setVideos(res.data)
     
      
      

    }
    fetchVideos()
    

  }, [type])
  
 
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
