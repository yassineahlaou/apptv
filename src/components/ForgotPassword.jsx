import React from 'react'
import './forgotpassword.scss'
import { useNavigate } from "react-router-dom";

import { useState , useEffect} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'

export default function ForgotPassword({isDark,setDark}) {
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [confirm , setConfirm] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleForgotPassword = async (e) =>{
         try{
        await axios.put(`/user/forgotPassword` , {email,password,confirm})

        navigate('/loginorregister')

        const MySwal = withReactContent(Swal)
        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New Password Confirmed! Log In Now.',
            showConfirmButton: false,
            timer: 1500
          })
         }catch(error){
            !error.response.data.includes("Proxy") ? setError(error.response.data) : setError("Check Your Connection")
            

         }

    }

  return (
    <div className='forgotpassword'>
         <div className="wrapper">
            <h1>Forgotten Password</h1>
            <input placeholder='Email' name="email" type="email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input placeholder='New Password' name="password" type="text" onChange={(e)=>setPassword(e.target.value)}></input>
            <input placeholder='Confirm  Password' name="confirm" type="text" onChange={(e)=>setConfirm(e.target.value)}></input>
            <button onClick={handleForgotPassword}  type="submit">Set Password</button>
            <span  className={ error != "" ? ('err') : ('')}>{error}</span>
         </div>

    </div>
  )
}
