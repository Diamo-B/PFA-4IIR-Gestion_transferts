import { createSlice } from "@reduxjs/toolkit";

export const authorizationsSlice = createSlice({
    name:'authorization_slice',
    initialState:{
        Authorizations: [],
        selectedAuthorization: null,
        Agents: [],
        isLoading: true
    },
    reducers:{
        setAuthorizations: (state,action)=>{
            state.Authorizations = action.payload
        },
        addAuthorization: (state,action)=>{
            state.Authorizations.push(action.payload)
        },
        resetAuthorizations: (state) => {
            state.Authorizations = []
        },
        setIsLoading: (state, action) => {
            state.isLoading =action.payload
        },
        setAgents: (state, action) => {
            state.Agents = action.payload
        },
        setSelectedAuthorization: (state, action)=>{
            state.selectedAuthorization = action.payload
        }
    }
})

export const {setAuthorizations, addAuthorization, resetAuthorizations, setIsLoading, setAgents, setSelectedAuthorization} = authorizationsSlice.actions;
export default authorizationsSlice.reducer;