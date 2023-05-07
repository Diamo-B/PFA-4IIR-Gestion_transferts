import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
    name:'locations_slice',
    initialState:{
        triggerWindow: null,
        Create: null, // Can be locations or transfers
    },
    reducers:{
        openWindow: (state) => {
            state.triggerWindow = true
        },
        closeWindow: (state) => {
            state.triggerWindow = false
        },
        setCreationType: (state, action) => {
            state.Create = action.payload
        }
    }
})

export const {
    openWindow,
    closeWindow,
    setCreationType
} = locationsSlice.actions;
export default locationsSlice.reducer;