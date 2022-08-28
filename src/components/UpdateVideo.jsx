import React from 'react'

import './updatevideo.scss'
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState , useEffect} from "react";

import { UploadFile } from '@mui/icons-material';
import axios from 'axios'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateVideo } from '../redux/videoSlice';
import app from '../firebase.js'


const UpdateVideo = props => {
    const [video, setVideo] = useState({})

    const dispatch = useDispatch()
    const {currentVideoUpdate} = useSelector((state)=>state.video)
    console.log(currentVideoUpdate)
    useEffect(()=>{
    const getVideo = async()=>{
        const resVideo = await axios.get(`/video/find/${props.videoId}`)
        setVideo(resVideo.data)
    }
    getVideo()
},[props.videoId])

    const [image, setImage] = useState(undefined)
    
    const [imgPerc, setImgPerc] = useState(0);
   
    const [inputs, setInputs] = useState({});

    const [update, setUpdate] = useState(false)
   
    
    const [tags, setTags] = useState([]);
    const  [checked, setChecked] = useState(false)

    const handleChange = (e) =>{
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });

    }
    

    const handleTags = (e) => {
      setChecked(true)
      //console.log(e.target.value.split(","))
       
        
        
          setTags(e.target.value.split(","))
          
        

        
        
      };
      console.log(tags)
     
     
      
      

      const uploadFile = (file, fileType) =>{
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
            fileType === "imgUrl" && setImgPerc(progress) 
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
        image &&  uploadFile(image, "imgUrl")

      }, [image]
      )

      const navigate = useNavigate();

      const handleUpdate = async (e) =>{
        e.preventDefault();
        console.log(checked)
        if (checked == false){
          for (var i=0; i<video.tags.length;i++){

          
          tags.push(video.tags[i])
          }
          
         }
         console.log(tags)
        try{
        const res = await axios.put(`/video/update/${video._id}`, {...inputs, tags})
        const resVidUp = await axios.get(`/video/find/${video._id}`)
        
       dispatch(updateVideo(resVidUp.data))
      
       setUpdate(true)
       
        }
        catch(error){
            console.log(error)
        }

        

      }

  return (
    
    <div className='updatevideo'>
        <div className="wrapper">
        <CloseIcon className='icon' onClick={props.handleClose} ></CloseIcon>

        {update ? (<div className='uploadSuccess'>
            <h1 >Video Updated Succesfully</h1>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            </div>) : (<><h1>Update Video</h1>
          
          
          <input type="text" placeholder='title' name="title" defaultValue={video.title} onChange={handleChange} ></input>
          <textarea type="text" placeholder='Description' name="desc" defaultValue={video.desc} onChange={handleChange}></textarea>
          <input type="text"  placeholder='tags, separate theme with comma' defaultValue={video.tags} onChange={handleTags}></input>
          <label>Image</label>
          {imgPerc > 0 ? (("Uplaoding :" + Math.round(imgPerc,2) + "%")) : (<input type="file"  accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>)}
          <button type="submit" onClick={handleUpdate}>Update</button></>)}
        </div>
    </div>
   
  )
}


export default UpdateVideo;