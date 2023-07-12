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
        addModel : (state, action) => {
            state.models.push(action.payload)
        },
        updateModel : (state, action) => {
            state.models = state.models.map((model)=> model.id === action.payload.id ? action.payload : model)
        },
        removeModel : (state, action) => {
            state.models = state.models.filter((model)=> model.id !== action.payload)
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
        createMode: false,
        updateMode: {
            Mode: false,
            fieldId: null
        },
        imagesPanels: {
            create: {
                state: false
            },
            view: {
                state: false,
                vehicle: null
            },
            update: {
                state: false,
                vehicle: null
            }
        },
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
        addVehicle : (state, action) => {
            state.vehicles.push(action.payload)
        },
        updateVehicle : (state, action) => {
            state.vehicles = state.vehicles.map((Vehicle)=> Vehicle.id === action.payload.id ? action.payload : Vehicle)
        },
        removeVehicle : (state, action) => {
            state.vehicles = state.vehicles.filter((Vehicle)=> Vehicle.id !== action.payload)
        },
        removeVehicles : (state, action) => {
            state.vehicles = state.vehicles.filter((Vehicle)=> !action.payload.includes(Vehicle.id))
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
        },
        //- create images panel
        showImagesPanel : (state) => {
            state.imagesPanels.create.state = true;
        },
        hideImagesPanel : (state) => {
            state.imagesPanels.create.state = false;
        },
        //- view images panel
        showImagesViewingPanel : (state, action) => {
            state.imagesPanels.view.state = true;
            state.imagesPanels.view.vehicle = action.payload;
        },
        hideImagesViewingPanel : (state) => {
            state.imagesPanels.view.state = false;
        },
        //- update images panel
        showImagesUpdatingPanel : (state, action) => {
            state.imagesPanels.update.state = true;
            state.imagesPanels.update.vehicle = action.payload;
        },
        hideImagesUpdatingPanel : (state) => {
            state.imagesPanels.update.state = false;
        },
        removeImageUpdatingPanel : (state, action) => {
            state.imagesPanels.update.vehicle.images = state.imagesPanels.update.vehicle.images.filter((image)=> image.path !== action.payload)
        }

    }
})

const vehiculesReducer = combineReducers({
    models: modelsSlice.reducer,
    vehicules: vehiclesSlice.reducer,
});
  
export const {
    setModels,
    addModel,
    updateModel,
    removeModel,
    enableModelCreateMode,
    disableModelCreateMode,
} = modelsSlice.actions;

export const {
    setOptions,
    setSelectedModel,
    setVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle,
    removeVehicles,
    setSelectedVehicles,
    resetVehicles,
    enableVehicleCreateMode,
    disableVehicleCreateMode,
    enableVehicleModifyMode,
    disableVehicleModifyMode,
    showImagesPanel,
    hideImagesPanel,
    showImagesViewingPanel,
    hideImagesViewingPanel,
    showImagesUpdatingPanel,
    hideImagesUpdatingPanel,
    removeImageUpdatingPanel
} = vehiclesSlice.actions;

export default vehiculesReducer;