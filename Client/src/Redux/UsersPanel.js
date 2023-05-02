import { createSlice } from "@reduxjs/toolkit";

export const usersPanelSlice = createSlice({
    name:'usersPanel_slice',
    initialState:{
        showCreateUserPanel: false,
        usersData: [],
        fetchingType: "all",
        usersFetchingErrors: []
    },
    reducers:{
        show: (state)=>{
            state.showCreateUserPanel = true
        },
        hide: (state)=>{
            state.showCreateUserPanel = false
        },
        setUsersData: (state,action) => {
            state.usersData = action.payload;
        },
        setFetchingType: (state,action)=>{
            state.fetchingType = action.payload
        },
        setUsersFetchingErrors: (state, action) => {
            state.usersFetchingErrors.push(action.payload)
        },
        resetFetchingErrors: (state) => {
            state.usersFetchingErrors = []
        }
    }
})

export const {show,hide,setUsersData,setFetchingType,setUsersFetchingErrors,resetFetchingErrors} = usersPanelSlice.actions;
export default usersPanelSlice.reducer;