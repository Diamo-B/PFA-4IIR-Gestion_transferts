import { createSlice } from "@reduxjs/toolkit";

export const othersSlice = createSlice({
    name:'others_auth_slice',
    initialState:{
        confirmOp: {
            operation_type: null,
            Impact: null,
            executeParams: null,
            value: null
        }
    },
    reducers:{
        openPanel: (state, action)=>{
            state.confirmOp.operation_type= action.payload.operation_type 
            state.confirmOp.Impact= action.payload.Impact
            state.confirmOp.executeParams = action.payload.executeParams
            state.confirmOp.value = true
        },
        closePanel: (state)=>{
            state.confirmOp.operation_type= null 
            state.confirmOp.Impact= null
            state.confirmOp.execute = null
            state.confirmOp.value = false
        },
    }
})

export const {openPanel, closePanel} = othersSlice.actions;
export default othersSlice.reducer;