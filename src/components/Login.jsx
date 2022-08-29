import React from 'react'
import { useNavigate } from "react-router-dom";
import './login.scss'

import app from '../firebase.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import GoogleIcon from '@mui/icons-material/Google';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { BsGoogle } from "react-icons/bs";
import { useState , useEffect} from "react";
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/userSlice.js'
import {auth, provider} from '../firebase.js'

import { signInWithPopup } from "firebase/auth"; //pop up to log with google 
export default function Login({isDark, setDark, setLogged, logged}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("")
  const [image, setImage] = useState(undefined)
  const [imgPerc, setImgPerc] = useState(0);
  const [message, setMessage] = useState("")
  const [errorReg, setErrorReg] = useState("")
  const [uploaded, setUploaded] = useState()
 

    
  const dispatch = useDispatch()

  const loginProcess = async (e)=>{
    e.preventDefault()
    dispatch(loginStart())
    try{
    const res = await axios.post("/user/login", {email, password}, {withCredentials: true})
    dispatch(loginSuccess(res.data))
    navigate('/')
   

    
    
    }
    catch(error){
      dispatch(loginFailure())
      console.log(error.response.data)
      
      !error.response.data.includes("Proxy") ? setError(error.response.data) : setError("Check Your Connection")

    }

  }

  const logInWithGoogle = async () =>{
    dispatch(loginStart())
    signInWithPopup(auth, provider)
    .then((result)=>{
       axios.post("/user/google", {
        username:result.user.displayName,
        email:result.user.email,
        profileimg:result.user.photoURL
      }).then((res)=> {
        dispatch(loginSuccess(res.data))
        navigate('/')
      })
    })
    .catch((error)=>{ dispatch(loginFailure())})

  }

  const registerProcess = async(e)=>{
    e.preventDefault()
    try{
      if(inputs.profileimg === undefined){
       
        setInputs(inputs.profileimg = "../assets/avatar.jpeg")
        //console.log(inputs.profileimg)
        
      }
      console.log(inputs)
    await axios.post("/user/register", {...inputs})
      setMessage("Welcome Aboard! Login Now to Use this app!")
      setInputs({username:"" , email:"" , password:""})
      setUploaded(true)
      setErrorReg("")
  }  
    catch(error){
      console.log(error)

      !error.response.data.includes("Proxy") ? setErrorReg(error.response.data) : setErrorReg("Check Your Connection")
       
   

      }

  }

  const handleChange = (e) =>{
    setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });

}
  const uploadFile = (file, fileType) =>{
    console.log(file.name)
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        fileType === "profileimg" && setImgPerc(progress) 
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        default:
            break;
        }
    }, 
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [fileType]: downloadURL };
          });
                 
            
          });
       
      }

    );

  }



  useEffect (()=>{
    image &&  uploadFile(image, "profileimg")

  }, [image]
  )

  

  return (
    <div className={'loggin ' + (isDark ? 'dark'  : '')}>
      
        <div className="wrapper">
          <div className="header">
       

<button className='google' onClick={logInWithGoogle}><BsGoogle></BsGoogle> <div>Log in with google</div></button>
</div>
      <div className="body">
          <div className="login">
            
             
          <h1>Sign In</h1>
            <input placeholder='email' name="email" type="email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input placeholder='password' name="password" type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <div className='butts'><button onClick={loginProcess}  type="submit">Login</button>
            <a href="/forgotpassword">Forgot Password</a>
            
           
            </div>
         <span  className={ error != "" ? ('err') : ('')}>{error}</span>
          
            </div>
            <hr></hr>

            <div className="register">
            <h1>Sign Up</h1>
            

            <input placeholder='username' name="username" type="text" value = {inputs.username} onChange={handleChange}></input>
            <input placeholder='email' name="email" type="email"  value = {inputs.email} onChange={handleChange}></input>
            <input placeholder='password' name="password" type="text"  value = {inputs.password} onChange={handleChange}></input>
            <label><strong>Choose Profile Image</strong></label>
          { !uploaded ? (imgPerc > 0 ? (("Upload Process :" + Math.round(imgPerc,2) + "%")) : (<input type="file" className='file'  accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>) ) : (<input type="file" className='file' accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>) }
            <button onClick={registerProcess} type="submit">Register</button>
            {errorReg != "" ? (<span className='err'>{errorReg}</span>) : ( message!="" ? (<span className='suc'>{message}</span>) : (''))}
            </div>
            </div>
        </div>
    </div>
  
  )
}
