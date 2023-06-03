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
        options: [],
        vehicules: [],
        selectedModel: null,
        isLoading: false
    },
    reducers:{
        setOptions : (state,action) => {
            let opts = []
            action.payload.map((model)=>{
                opts.push({value: model.id,label: model.label});
            })
            state.options = opts;
        },
        setVehicules : (state, action) => {
            let vehicules = []
            action.payload.map(vehicule=>{
                vehicules.push(vehicule)
            });
            state.vehicules = vehicules;
        },
        setSelectedModel : (state, action) => {
            state.selectedModel = action.payload
        },
        activateLoading : (state) => {
            state.isLoading = true
        },
        disableLoading : (state) => {
            state.isLoading = false
        }
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
    setOptions,
    setSelectedModel,
    activateLoading,
    disableLoading,
    setVehicules,
} = vehiculesSlice.actions;

export default vehiculesReducer;