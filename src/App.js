
//import styled from 'styled-components' //create css inside js
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { useState } from "react";

import './app.scss';
import Main from './components/Main';
import Video from './components/Video';
import CloseIcon from '@mui/icons-material/Close';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate 
  
} from "react-router-dom";
import Login from './components/Login';
import Upload from './components/Upload';
import Search from './components/Search'
import UpdateProfile from './components/UpdateProfile';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';







function App( ) {
  const [menuOpen, setMenuOpen]= useState(false)
  const [isDark, setDark]= useState(false)
  const [open, setOpen] = useState(false)
  const [miniMenu, setMiniMenu] = useState(false)
  

 
 
  
  const togglePopup = () => {
    setOpen(!open);
  }
  return (
   
    <div className= 'app'>
      <BrowserRouter>
      <Navbar action={togglePopup} miniMenu={miniMenu} setMiniMenu={setMiniMenu} open={open} setOpen={setOpen} menuOpen = {menuOpen} setMenuOpen={setMenuOpen} isDark={isDark}  setDark={setDark}></Navbar>
      <Menu menuOpen = {menuOpen} setMenuOpen={setMenuOpen} isDark={isDark}  setDark={setDark}></Menu>

      
      <div className={'cont ' + (menuOpen || miniMenu ? 'active' : '')}>

      

          <Routes>
            <Route path="/">
            
              <Route index element={<Main type="random" miniMenu={miniMenu} setMiniMenu={setMiniMenu}  isDark={isDark}  setDark={setDark}></Main> } />
              <Route path="trend" element={<Main   type="trend" miniMenu={miniMenu} setMiniMenu={setMiniMenu} isDark={isDark}  setDark={setDark}></Main> } />
              <Route path="sub" element={<Main type="sub" miniMenu={miniMenu} setMiniMenu={setMiniMenu} isDark={isDark}  setDark={setDark}></Main> } />
              <Route path="video">
                <Route path=":id" element={<Video miniMenu={miniMenu} setMiniMenu={setMiniMenu} isDark={isDark}  setDark={setDark}></Video>} />
              </Route>
              <Route path="loginorregister" element = {<Login isDark={isDark}  setDark={setDark}></Login>} />
              <Route path="search" element={<Search miniMenu={miniMenu} setMiniMenu={setMiniMenu} isDark={isDark}  setDark={setDark} > </Search>} />
              <Route path="updateprofile" element={<UpdateProfile  miniMenu={miniMenu} setMiniMenu={setMiniMenu} isDark={isDark}  setDark={setDark} > </UpdateProfile>} />
              <Route path="changepassword" element={<ChangePassword   isDark={isDark}  setDark={setDark} > </ChangePassword>} />
              <Route path="forgotpassword" element={<ForgotPassword   isDark={isDark}  setDark={setDark} > </ForgotPassword>} />
            

            </Route>
          </Routes>

          {open && <Upload handleClose={togglePopup}/>}
          
       
       

      
      
     </div>
   
     </BrowserRouter>
    

      </div>
    
      
      
    
      
     
  );
}

export default App;
