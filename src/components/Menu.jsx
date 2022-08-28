import React from 'react'
//import styled  from 'styled-components'
import './menu.scss'

import { useState , useEffect} from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import ModeNightIcon from '@mui/icons-material/ModeNight';

//import DarkModeIcon from '@mui/icons-material/DarkMode';





  


export default function Menu({menuOpen, setMenuOpen, isDark, setDark}) {
  const [logged, setLogged] = useState(false)

  const {currentUser} = useSelector((state)=>state.user)

  return (
   
    <div className={'menu ' + (menuOpen ? 'active ' : '')+ (isDark ? 'dark' : '')} id="menu">
      <div className="wrapper">
      <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className="item">
          <HomeIcon className='icon'/>
          <span>Home</span>
        </div>
        </Link>
        <Link to="/trend" style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className="item">
          <ExploreIcon className='icon'/>
          <span>Explore</span>
        </div>
        </Link>
        {currentUser ?
       ( <Link to="/sub" style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className="item">
          <SubscriptionsIcon className='icon'/>
          <span>Subscriptions</span>
        </div>
        </Link>) 
        : 
        (<Link to="/loginorregister" style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className="item">
          <SubscriptionsIcon className='icon'/>
          <span>Subscriptions</span>
        </div>
        </Link>)
}
        
        <hr></hr>
        <div className="item">
          <VideoLibraryIcon className='icon'/>
          <span>Librairie</span>
        </div>
        <div className="item">
          <HistoryIcon className='icon'/>
          <span>History</span>
        </div>
        
        
          { currentUser ? '' : (
           
            <div>
              <hr></hr>
          <p>SIGN IN</p>
          <Link to="loginorregister" style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <button><PersonIcon className='icon'></PersonIcon>Sign in</button>
          </Link>
          </div>
          
          )
}
<hr></hr>
       
        
        <div className="item">
          <LibraryMusicIcon className='icon'/>
          <span>Music</span>
        </div>
        <div className="item">
          <SportsBasketballIcon className='icon'/>
          <span>Sports</span>
        </div>
        <div className="item">
          <MovieCreationIcon className='icon'/>
          <span>Movie</span>
        </div>
        <div className="item">
          <SportsEsportsIcon className='icon'/>
          <span>Gaming</span>
        </div>
        <div className="item">
          <NewspaperIcon className='icon'/>
          <span>News</span>
        </div>
        <div className="item">
          <LiveTvIcon className='icon'/>
          <span>Live</span>
        </div>
        <hr></hr>
        <div className="item">
          <FlagIcon className='icon'/>
          <span>Flag</span>
        </div>
        <div className="item">
          <HelpIcon className='icon'/>
          <span>Help</span>
        </div>
        <div className="item">
          <SettingsIcon className='icon'/>
          <span>Settings</span>
        </div>
        
        <div className="item" onClick={()=> isDark ? setDark(false) : setDark(true) }>
        
          {isDark  ? <><LightModeIcon className='icon' /><span>Light Mode</span></> : <><ModeNightIcon className='icon' /><span>Night Mode</span></>}
          
        </div>
        
       
        
        

      </div>

      


    </div>
    );
         

  
}
