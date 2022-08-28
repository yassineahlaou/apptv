import React from 'react'
import './updateprofile.scss'

//import AnimatedNumbers from "react-animated-numbers";
//import AnimatedNumber from 'react-animated-number';



import app from '../firebase.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useState , useEffect} from "react";
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import CardVideoEdit from './CardVideoEdit';
import { updateProfile } from '../redux/userSlice';

export default function UpdateProfile({action , isDark, setDark}) {

  const {videosAfterDelete} = useSelector((state)=>state.video)
  const {deletedVideo} = useSelector((state)=>state.video)
   const dispatch = useDispatch()
  
  const [image, setImage] = useState(undefined)
  
  const [imgPerc, setImgPerc] = useState(0);
  const [message, setMessage] = useState("")
  const [errorUp, setErrorUp] = useState("")
  const [updated, setUpdated] = useState()
  const [checked , setChecked] = useState()
  const [afterSlice , setAfterSlice] = useState([])
  
 /* const [dislikes, setDislikes] = useState(0);
  const [subs, setSubs] = useState(0);
  const [views, setViews] = useState(0);*/


  const {currentUser} = useSelector((state)=>state.user)
  
  const [videos, setVideos] = useState([])

  
 
  
    const [inputs, setInputs] = useState({});
    useEffect(()=>{
    const getStates = async ()=>{
        const resVideos = await axios.get('/video/myvideos')
        

       

       
        setVideos(resVideos.data)
        console.log(videos)
      
        

    }
    getStates()
},[])



//deletedVideo != undefined &&  window.location.reload(false);

//console.log(videos)
let viewsCounter =0
let likesCounter =0
let dislikesCounter = 0
   videos.map(video=>{viewsCounter=viewsCounter+video.views})
   videos.map(video=>{likesCounter=likesCounter+video.likes?.length})
   videos.map(video=>{dislikesCounter=dislikesCounter+video.dislikes?.length})
    //console.log(c)

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

  const updateProcess = async(e)=>{
    e.preventDefault()
    try{
      //console.log(inputs)
      if(inputs.profileimg === undefined){
        if(checked){
        setInputs(inputs.profileimg = "../assets/avatar.jpeg")
        //console.log(inputs.profileimg)
        }
      }
    await axios.put(`/user/update/${currentUser._id}`, {...inputs})
    const resUpdated = await axios.get(`/user/find/${currentUser._id}`)
    dispatch(updateProfile(resUpdated.data))
    console.log(inputs.profileimg)
      setMessage("Profile Updated Succefully! ")
      //setInputs({username:"" , email:"" , password:""})
      setUpdated(true)
      setErrorUp("")
  }  
    catch(error){
      console.log(error)
        setErrorUp(error.response.data)

      }

  }
  const handleCheck = (e)=>{
    (e.target.checked) ? setChecked(true) : setChecked(false)
  }

  return (
    <div className={'update ' + (isDark ? 'dark'  : '')}>
        <div className="top">
        <div className="left">
            <h1>Update your profile</h1>
            <div className='username'>
            <label><strong>Update Username</strong></label>
            <input placeholder='username' name="username" type="text" defaultValue = {currentUser.username} onChange={handleChange}></input>
            </div>
            <div className='checkboxStyle'>
            <input type="checkbox" id="check" onChange={handleCheck}></input> <p>Remove Profile Image</p>
            </div>
            
            <div className={(!checked ? 'image' : 'hide')}>
            <label><strong>Update Profile Image</strong></label>
            { !updated ? (imgPerc > 0 ? ("Upload Process :" + Math.round(imgPerc,2) + "%") : (<input type="file" className='file'  accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>) ) : (<input type="file" className='file' accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>) }
            </div>
            <button onClick={updateProcess} type="submit">Update Profile</button>
            {errorUp != "" ? (<span className='err'>{errorUp}</span>) : (message!="" ? (<span className='suc'>{message}</span>) : ('') )}
        
         </div>
         <div className="right">

                <div className="subscribers">
                    
             <span>{currentUser.subscribes}</span>
                    <p>sub</p>
                </div>
                <div className="likes">
                <span>{likesCounter}</span>
               
                    <p>likes</p>
                </div>
                <div className="dislikes">
                <p>{dislikesCounter}</p>
              
                    <p>dislikes</p>
                </div>
                <div className="views">
                <span>{viewsCounter}</span>
                

                    <p>views</p>
                </div>
         </div>
         </div>

         <div className="bottom">

         {
        
       /* videosAfterDelete != [] ? (videosAfterDelete.map(video=>
          <CardVideoEdit key={video._id} videoId = {video._id} video={video} action = {action} isDark={isDark}  setDark={setDark}></CardVideoEdit>
         )) : */
        
     
        videos.map(video=>
         <CardVideoEdit key={video._id} videoId = {video._id} video={video} action = {action} isDark={isDark}  setDark={setDark}></CardVideoEdit>
        )
        }

         </div>
    </div>
  )
}
