import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
    name: "locations_slice",
    initialState: {
        triggerWindow: null,
        windowType: null, // Can be create or update
        triggerType: "Location", // Can be locations or transfers
        locations: [],
        paths: [],
        selected: [],
        locationToUpdate: null,
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
        setPaths: (state, action) => {
            return {...state, paths: action.payload} 
        },
        setLocations: (state, action) => {
            return { ...state, locations: action.payload };
        },
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
        setLocationToUpdate: (state,action) => {
            return {...state, locationToUpdate: action.payload};
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
        }
    },
});

export const {
    setWindowType,
    openWindow,
    closeWindow,
    setType,
    setPaths,
    setLocations,
    addSelection,
    removeSelection,
    resetSelection,
    setLocationToUpdate,
    SetToast,
    disableToast
} = locationsSlice.actions;
export default locationsSlice.reducer;
