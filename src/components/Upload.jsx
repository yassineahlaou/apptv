import React from 'react'
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState , useEffect} from "react";
import './upload.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { UploadFile } from '@mui/icons-material';
import axios from 'axios'
import { Link } from "react-router-dom";
import app from '../firebase.js'



const Upload = props  =>  {
    const [image, setImage] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});

    const [uploaded, setUploaded] = useState(false)
   
    
    const [tags, setTags] = useState([]);

    const handleChange = (e) =>{
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });

    }

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
      };

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
            fileType === "imgUrl" ? setImgPerc(progress) : setVideoPerc(progress)
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
        video && uploadFile(video, "videoUrl") // && means if condition

      }, [video]
      )

      useEffect (()=>{
        image &&  uploadFile(image, "imgUrl")

      }, [image]
      )

      const navigate = useNavigate();

      const handleUpload = async (e) =>{
        e.preventDefault();
        try{
        const res = await axios.post("/video/add", {...inputs, tags})
        
       navigate(`/video/${res.data._id}`)
       setUploaded(true)

       const MySwal = withReactContent(Swal)
       MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Video Uploaded Succesfully',
        showConfirmButton: false,
        timer: 1500
      })
        }
        catch(error){
            console.log(error)
        }

        

      }
  return (
    
    <div className={!uploaded ? 'uploadPop' : 'hide'}>
        <div className="wrapper">
        <CloseIcon className='icon' onClick={props.handleClose} ></CloseIcon>

   <><h1>Upload New Video</h1>
          <label>Video</label>
          {videoPerc > 0 ? ("Uploading:" + Math.round(videoPerc,2) + "%") : (<input type="file"  accept="video/*" onChange={(e) => setVideo(e.target.files[0])}></input>)}
          
          <input type="text" placeholder='title' name="title" onChange={handleChange} ></input>
          <textarea type="file" placeholder='Description' name="desc" onChange={handleChange}></textarea>
          <input type="text"  placeholder='tags, separate theme with comma' onChange={handleTags}></input>
          <label>Image</label>
          {imgPerc > 0 ? (("Uplaoding :" + Math.round(imgPerc,2) + "%")) : (<input type="file"  accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>)}
          <button type="submit" onClick={handleUpload}>Upload</button></>
        </div>
    </div>
  )
}

export default Upload;