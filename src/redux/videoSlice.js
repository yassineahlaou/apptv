import { createSlice } from '@reduxjs/toolkit'


export const videoSlice = createSlice({
    name: "video",
 
  initialState: {

    currentVideo : null,
    
    loading:false,
    error:false,
    currentVideoUpdate : null,
    deletedVideo : null
    

  },
  reducers: {
   fetchStart : (state)=>{state.loading = true},
   fetchSuccess : (state,action)=>{state.loading = false ; 
    
    state.currentVideo = action.payload;
   
   

  },
   fetchFailure : (state)=>{state.loading = false;state.error=true},

   like: (state, action) => {
    if(state.currentVideo.dislikes.includes(action.payload)){
      state.currentVideo.dislikes.splice(action.payload,1)
      state.currentVideo.likes.push(action.payload)
    }
    else{
      state.currentVideo.likes.push(action.payload)
    }
   },

   unlike: (state, action) => {
   
      state.currentVideo.likes.splice(action.payload,1)
      
    },
    dislike: (state, action) => {
      if(state.currentVideo.likes.includes(action.payload)){
        state.currentVideo.likes.splice(action.payload,1)
        state.currentVideo.dislikes.push(action.payload)
      }
      else{
        state.currentVideo.dislikes.push(action.payload)
      }
     },
     undislike: (state, action) => {
   
      state.currentVideo.dislikes.splice(action.payload,1)
      
    },
    updateVideo : (state, action) =>{
      state.loading = false;
      state.currentVideoUpdate = action.payload;
     },

    

     
  

   
    

    


    
   }
   
  
  
})

// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchFailure, like, unlike, dislike, undislike, updateVideo} = videoSlice.actions

export default videoSlice.reducer