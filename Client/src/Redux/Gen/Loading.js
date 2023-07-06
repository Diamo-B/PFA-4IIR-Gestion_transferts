import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
    name:'Loading_state_slice',
    initialState:{
        loading:false,
        unmount:false,
    },
    reducers:{
        isLoading:(state)=>{
            state.loading=true;
        },
        doneLoading:(state)=>{
            state.loading=false;
        },
        shouldUnmount:(state)=>{
            state.unmount=true;
        },
        shouldMount : (state)=>{
            state.unmount=false;
        }
    }
})

export const {
    isLoading,
    doneLoading,
    shouldUnmount,
    shouldMount
} = loading.actions;
export default loading.reducer;