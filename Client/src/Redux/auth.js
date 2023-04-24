import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
    name:'user_auth_slice',
    initialState:{
        value: null
    },
    reducers:{
        setUser: (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setUser} = userAuthSlice.actions;
export default userAuthSlice.reducer;