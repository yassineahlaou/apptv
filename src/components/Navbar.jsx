import React from 'react'
import './navbar.scss'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useState , useEffect} from "react";

import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { logout , loginStart } from '../redux/userSlice';

import Upload from './Upload';


export default function Navbar({miniMenu, setMiniMenu, action, searchVideos, setSearchVideos, open, setOpen, menuOpen, setMenuOpen, isDark, setDark}) {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user)

  

  

  

  const dispatch = useDispatch()

  const logoutProcess = async (e)=>{
    //e.preventDefault()
    dispatch(loginStart())
    try{
    const res = await axios.get("/user/logout")
    dispatch(logout())
    setMiniMenu(false)
    
    }
    catch(error){
      console.log(error)

    }

  }
  
  
  const [inputSearch , setInputSearch] = useState("")
 
  



    
 
 
  //const currentUser = useSelector(state=>state.user.currentUser)
  return (
    <>
    
    <div className={'navbar ' + (menuOpen ? 'active ' : '') +  (isDark ? 'dark' : '')}>
    <div className="wrapper">
     
      
      <div className="left">

        <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
         
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
       <img className='logo'  src={menuOpen ? (isDark ? '../assets/logowhite.png' : '../assets/logoblack.png') : (isDark ? '../assets/logowhite.png' : '../assets/logoblack.png')}  alt=""></img>
       </Link>
        </div>
        <div className='cent' >
    
        <input placeholder='Search' type="text"  name="searchField"  onChange={(e)=>setInputSearch(e.target.value)}></input>
       
        <SearchIcon className='icon' onClick={()=>navigate(`/search?q=${inputSearch}`)}></SearchIcon>


        </div>

        <div className='right'>
          {currentUser ? (
          <div className='user'>


              <VideoCallIcon  className="ico" onClick={action}></VideoCallIcon>
              <div  className="container"> 
            <OutsideClickHandler onOutsideClick={() => setMiniMenu(false)}>  <button onClick={()=>setMiniMenu(true)} className="button"><img src={currentUser.profileimg}   referrerpolicy="no-referrer" alt=""></img></button></OutsideClickHandler>
              <div className={miniMenu ? 'dropdown' : 'hide'} >
              
                  <ul>
                    <li onClick={()=>setMiniMenu(false)} className='disabled'><strong>Hi...,{ currentUser.username}</strong></li>
                    <hr></hr>
                    <Link to="updateprofile"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li onClick={()=>setMiniMenu(false)} >Manage Profile</li>
                    </Link>
                    <hr></hr>
                    <Link to="changepassword" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li onClick={()=>setMiniMenu(false)} >Update Password</li>
                    </Link>
                    <hr></hr>
                    <Link to="/loginorregister" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li onClick={logoutProcess}>Logout</li>
                    </Link>
                  </ul>
              </div>
              </div>
              
              

          </div>
    ) : 
        (<Link to="loginorregister" style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <button><PersonIcon className='icon'></PersonIcon>Sign in</button>
          </Link>)
}
        </div>

       
        
      
    </div>
    

  </div>

  
</>
  )
}
