import React from 'react'

import './changepassword.scss'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { useState , useEffect} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { logout , loginStart } from '../redux/userSlice';
import withReactContent from 'sweetalert2-react-content'

export default function ChangePassword({isDark, setDark}) {
    const [oldpassword , setOldPassword] = useState("")
    const [password , setNewPassword] = useState("")
    const [rewrite , setReWrite] = useState("")
    const [error, setError] = useState("")


    const navigate = useNavigate();

    const dispatch = useDispatch()
    
    const {currentUser} = useSelector((state)=>state.user)

    const logoutProcess = async (e)=>{
        //e.preventDefault()
        
        try{
        const res = await axios.get("/user/logout")
        dispatch(logout())
        
        
        }
        catch(error){
          console.log(error)
    
        }
    
      }

    const handleChangePassword = async (e) =>{

            try{
        const userId = currentUser._id
        
        await axios.put(`/user/updatePassword/${userId}` , {password , oldpassword , rewrite})
        logoutProcess(e)
        
        navigate('/loginorregister')

        const MySwal = withReactContent(Swal)
        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Password Changed! Log In Again.',
            showConfirmButton: false,
            timer: 1500
          })

    }
    catch(error){
        !error.response.data.includes("Proxy") ? setError(error.response.data) : setError("Check Your Connection")
        
    }
}



  return (
    <div className={'changepassword '  + (isDark ? 'dark'  : '')}>
         <div className="wrapper">
            <h1>Change Password</h1>
            <input placeholder='Old Password' name="oldpassword" type="text" onChange={(e)=>setOldPassword(e.target.value)}></input>
            <input placeholder='New Password' name="password" type="text" onChange={(e)=>setNewPassword(e.target.value)}></input>
            <input placeholder='rewrite New Password' name="rewrite" type="text" onChange={(e)=>setReWrite(e.target.value)}></input>
            <button onClick={handleChangePassword}  type="submit">Change Password</button>
            <span  className={ error != "" ? ('err') : ('')}>{error}</span>
         </div>


    </div>
  )
}
