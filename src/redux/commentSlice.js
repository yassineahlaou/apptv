import { createSlice } from '@reduxjs/toolkit'

export const commentSlice = createSlice({
    name: "comment",
 
  initialState: {

    currentComment : null,
    loading:false,
    commentsArray : [],
    error:false

  },
  reducers: {
   uploadStart : (state)=>{state.loading = true},
   uploadSuccess : (state,action)=>{state.loading = false ; state.currentComment = action.payload},
   uploadFailure : (state)=>{state.loading = false;state.error=true},
   getComments : (state,action) => {state.loading = false;
    /*action.payload.map(dat => 
        state.commentsArray?.push(dat)
        );
    console.log(state.commentsArray?.length)*/

    state.commentsArray = action.payload
    
   }

   
    


    
   }
   
  
  
})

// Action creators are generated for each case reducer function
export const { uploadStart, uploadSuccess, uploadFailure, getComments } = commentSlice.actions

export default commentSlice.reducer