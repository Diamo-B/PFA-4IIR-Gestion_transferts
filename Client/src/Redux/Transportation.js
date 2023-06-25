import { combineReducers, createSlice } from "@reduxjs/toolkit";

const modelsSlice = createSlice({
    name: "models",
    initialState:{
        models: [],
        createMode: false,
    },
    reducers:{
        setModels : (state,action) => {
            state.models = action.payload
        },
        enableModelCreateMode : (state) => {
            state.createMode = true;
        },
        disableModelCreateMode : (state) => {
            state.createMode = false
        }
    }
})
const vehiclesSlice = createSlice({
    name: "vehicles",
    initialState:{
        options: [],
        vehicles: [],
        selectedVehicles: [],
        selectedModel: null,
        isLoading: false,
        createMode: false,
        updateMode: {
            Mode: false,
            fieldId: null
        }
    },
    reducers:{
        setOptions : (state,action) => {
            let opts = []
            action.payload.map((model)=>{
                opts.push({value: model.id,label: model.label});
            })
            state.options = opts;
        },
        setVehicles : (state, action) => {
            let Vehicles = []
            action.payload.map(Vehicle=>{
                Vehicles.push(Vehicle)
            });
            state.vehicles = Vehicles;
        },
        setSelectedVehicles : (state, action) => {
            let Vehicles = []
            action.payload.map(Vehicle=>{
                Vehicles.push(Vehicle)
            });
            state.selectedVehicles = Vehicles;
        },
        resetVehicles : (state) => {
            state.vehicles = [];
        },
        setSelectedModel : (state, action) => {
            state.selectedModel = action.payload
        },
        activateLoading : (state) => {
            state.isLoading = true
        },
        disableLoading : (state) => {
            state.isLoading = false
        },
        enableVehicleCreateMode : (state) => {
            state.createMode = true;
        },
        disableVehicleCreateMode : (state) => {
            state.createMode = false
        },
        enableVehicleModifyMode : (state,action) => {
            state.updateMode= {
                Mode: true,
                fieldId: action.payload
            }
        },
        disableVehicleModifyMode : (state) => {
            state.updateMode= {
                Mode: false,
                fieldId: null
            }
        }
    }
})

const windowSLice = createSlice({
    name: "window",
    initialState:{
        refetch: false,
    },
    reducers:{
        activateRefetch : (state) => {
            state.refetch = true
        },
        disableRefetch : (state) => {
            state.refetch = false
        }
    }
})

const vehiculesReducer = combineReducers({
    models: modelsSlice.reducer,
    vehicules: vehiclesSlice.reducer,
    window: windowSLice.reducer
});
  
export const {
    setModels,
    enableModelCreateMode,
    disableModelCreateMode,
} = modelsSlice.actions;

export const {
    setOptions,
    setSelectedModel,
    activateLoading,
    disableLoading,
    setVehicles,
    setSelectedVehicles,
    resetVehicles,
    enableVehicleCreateMode,
    disableVehicleCreateMode,
    enableVehicleModifyMode,
    disableVehicleModifyMode,
} = vehiclesSlice.actions;

export const  {
    activateRefetch,
    disableRefetch,
} = windowSLice.actions;

export default vehiculesReducer;