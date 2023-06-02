import { combineReducers, createSlice } from "@reduxjs/toolkit";

const modelsSlice = createSlice({
    name: "models",
    initialState:{
        editMode: false
    },
    reducers:{
        enableEditMode : (state) => {
            state.editMode = true;
        },
        disableEditMode : (state) => {
            state.editMode = false
        },
        toggleEditMode : (state) => {
            state.editMode = !state.editMode
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
    enableEditMode,
    disableEditMode,
    toggleEditMode,
} = modelsSlice.actions;

export const {

} = vehiculesSlice.actions;

export default vehiculesReducer;