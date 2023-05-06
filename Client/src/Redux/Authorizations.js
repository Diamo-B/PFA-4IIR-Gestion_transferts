import { createSlice } from "@reduxjs/toolkit";
import { startOfDay } from "date-fns/esm/fp";

export const authorizationsSlice = createSlice({
    name:'authorization_slice',
    initialState:{
        Authorizations: [],
        selectedAuthorization: null,
        Agents: [],
        isLoading: true,
        modifyMode: false,
        modification:[]
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
        },
        activateModifyMode:(state) => {
            state.modifyMode = true
        },
        disableModifyMode:(state) => {
            state.modifyMode = false
        },
        //TODO:---------------------------CombineReducers later------------------------------------
        //! modification state
        addUser: (state, action) => {
            state.modification.findIndex(field => field.email === action.payload.email) === -1 &&
            state.modification.push(action.payload);
        },
        addCategory: (state, action) => {
            const userIndex = state.modification.findIndex(user => user.email === action.payload.email);
            state.modification[userIndex].category.findIndex(cat => cat.value === action.payload.category.value) === -1 
            &&
            state.modification[userIndex].category.push(action.payload.category);
        },
        addPermission: (state, action) => {
            const userIndex = state.modification.findIndex(user => user.email === action.payload.email); //! needs to be >= 0
            
            const categoryIndex = state.modification[userIndex].category.findIndex(category => category.value === action.payload.category.value);
            //! needs to be >= 0
            
            const permissionExists = state.modification[userIndex].category[categoryIndex].permissions.some(
                (permission) => permission.value === action.payload.category.permission
            ); //! needs to be false

            if(userIndex >= 0 && categoryIndex >= 0 && !permissionExists)
            {            
                state.modification[userIndex].category[categoryIndex].permissions.push({value: action.payload.category.permission})
            }
            
        },
        removePermission: (state, action) => {
            const userIndex = state.modification.findIndex(user => user.email === action.payload.email); //! needs to be >= 0
            
            const categoryIndex = state.modification[userIndex].category.findIndex(category => category.value === action.payload.category.value);
            //! needs to be >= 0
            
            const permissionExists = state.modification[userIndex].category[categoryIndex].permissions.some(
                (permission) => permission.value === action.payload.category.permission
            ); //! needs to be true

            if (userIndex >= 0 && categoryIndex >= 0 && permissionExists) {            
                state.modification[userIndex].category[categoryIndex].permissions = state.modification[userIndex].category[categoryIndex].permissions.filter((permission) => permission.value !== action.payload.category.permission);
            }
              
        },
        //TODO: Make a resetModifications action that will launch onClick on the button save to prepare for another modification
        resetModification: (state) =>{
            state.modification = []
        }
    }
})

export const {setAuthorizations, addAuthorization, resetAuthorizations, setIsLoading, setAgents, setSelectedAuthorization, disableModifyMode, activateModifyMode, resetModification, addUser, addCategory, addPermission, removePermission} = authorizationsSlice.actions;
export default authorizationsSlice.reducer;