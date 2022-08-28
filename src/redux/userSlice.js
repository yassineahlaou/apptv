import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
 
  initialState: {

    currentUser : null,
    loading:false,
    error:false

  },
  reducers: {
   loginStart : (state)=>{state.loading = true},
   loginSuccess : (state,action)=>{state.loading = false ; state.currentUser = action.payload},
   loginFailure : (state)=>{state.loading = false;state.error=true},
   logout: (state)=>{state.loading = false;state.error=false;state.currentUser = null},

   subscription: (state, action) => {
    if(state.currentUser.subscribedUsers.includes(action.payload)){
      state.currentUser.subscribedUsers.splice(action.payload,1)
      
    }
    else{
      state.currentUser.subscribedUsers.push(action.payload)
    }
   },
   updateProfile : (state, action) =>{
    state.loading = false;
    state.currentUser = action.payload;
   }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout , subscription, updateProfile} = userSlice.actions

export default userSlice.reducer