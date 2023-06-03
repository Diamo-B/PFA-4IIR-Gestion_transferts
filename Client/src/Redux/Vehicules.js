import { combineReducers, createSlice } from "@reduxjs/toolkit";

const modelsSlice = createSlice({
    name: "models",
    initialState:{
        models: [],
        createMode: false,
        refetch: false
    },
    reducers:{
        setModels : (state,action) => {
            state.models = action.payload
        },
        enableCreateMode : (state) => {
            state.createMode = true;
        },
        disableCreateMode : (state) => {
            state.createMode = false
        },
        activateRefetch : (state) => {
            state.refetch = true
        },
        disableRefetch : (state) => {
            state.refetch = false
        }
    }
})
const vehiculesSlice = createSlice({
    name: "vehicules",
    initialState:{

    },
    reducers:{
        
    }
})

const vehiculesReducer = combineReducers({
    models: modelsSlice.reducer,
    vehicules: vehiculesSlice.reducer,
});
  
export const {
    setModels,
    enableCreateMode,
    disableCreateMode,
    activateRefetch,
    disableRefetch,
} = modelsSlice.actions;

export const {

} = vehiculesSlice.actions;

export default vehiculesReducer;