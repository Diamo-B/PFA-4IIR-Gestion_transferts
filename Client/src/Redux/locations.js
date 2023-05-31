import { combineReducers, createSlice } from "@reduxjs/toolkit";

const locationsSlice = createSlice({
    name: "locations",
    initialState:{
        locations: [],
        locationToUpdate: null,
    },
    reducers:{
        setLocations: (state, action) => {
            return { ...state, locations: action.payload };
        },
        setLocationToUpdate: (state,action) => {
            return {...state, locationToUpdate: action.payload};
        },
    }
})
const pathsSlice = createSlice({
    name: "paths",
    initialState:{
        paths:[],
    },
    reducers:{
        setPaths: (state, action) => {
            return {...state, paths: action.payload} 
        },
    }
})

export const windowSlice = createSlice({
    name: "locations_slice",
    initialState: {
        triggerWindow: null,
        Refetch: false,
        windowType: null, // Can be create or update
        triggerType: "Location", // Can be locations or transfers
        selected: [],
        toast:{
            type: "",
            message: "",
            active: false,
            reload: false
        }
    },
    reducers: {
        setWindowType: (state, action) => {
            return {...state, windowType: action.payload}
        },
        openWindow: (state) => {
            return { ...state, triggerWindow: true };
        },
        closeWindow: (state) => {
            return { ...state, triggerWindow: false, windowType: null };
        },
        setType: (state, action) => {
            return { ...state, triggerType: action.payload };
        },
        SetToast: (state, action) => {
            let toast= {
                type: action.payload.type,
                message: action.payload.message,
                active: true,
                reload: action.payload.reload,
            }
            return { ...state, toast: toast };
        },
        disableToast: (state) => {
            let toast= {
                type: "",
                message: "",
                active: false,
                reload: false
            }
            return { ...state, toast: toast };
        },

        //? Selection mechanism
        addSelection: (state, action) => {
            const updatedSelected = [...state.selected, action.payload];
            return { ...state, selected: updatedSelected };
        },
        removeSelection: (state, action) => {
            let set = new Set(state.selected);
            set.delete(action.payload);
            return { ...state, selected: [...set] };
        },
        resetSelection: (state) => {
            return { ...state, selected: [] };
        },

        //? Refetch mechanism
        triggerRefetch: (state) => {
            return { ...state,Refetch: true}
        },
        disableRefetch: (state) => {
            return { ...state, Refetch: false}
        },
    },
});

const locationsReducers = combineReducers({
    locations: locationsSlice.reducer,
    paths: pathsSlice.reducer,
    window: windowSlice.reducer
});
  

export const {
    setWindowType,
    openWindow,
    closeWindow,
    setType,
    SetToast,
    disableToast,
    addSelection,
    removeSelection,
    resetSelection,
    triggerRefetch,
    disableRefetch
} = windowSlice.actions;
  
export const {
    setLocations,
    setLocationToUpdate,
} = locationsSlice.actions;

export const {
    setPaths
} = pathsSlice.actions;

export default locationsReducers;
