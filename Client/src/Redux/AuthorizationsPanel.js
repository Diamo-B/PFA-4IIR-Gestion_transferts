import { createSlice } from "@reduxjs/toolkit";

export const AuthorizationsPanelSlice = createSlice({
    name: "authorizationsPanel_slice",
    initialState:{
        authorisations:[],
    },
    reducers:{
        pushAuthorisation: (state,action) => {
            state.authorisations.push(action.payload)
        },
        resetAuthorisations: (state) => {
            state.authorisations = []
        }
    }
})

export const { pushAuthorisation, resetAuthorisations } = AuthorizationsPanelSlice.actions;

export default AuthorizationsPanelSlice.reducer;