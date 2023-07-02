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
        addLocation: (state, action) => {
            let array = [...state.locations, action.payload];
            state.locations = array;
        },
        updateLocation: (state, action) => {
            const updatedLocations = state.locations.map((location) => {
                if (location.id === action.payload.id) {
                    return action.payload;
                }
                return location;
            });
            return { ...state, locations: updatedLocations };
        },
        deleteLocation: (state, action) => {
            const updatedLocations = state.locations.filter(
                (location) => location.id !== action.payload
            );
            return { ...state, locations: updatedLocations };
        },
        deleteLocations: (state, action) => {
            const updatedLocations = state.locations.filter(
                (location) => !action.payload.includes(location.id)
            );
            return { ...state, locations: updatedLocations };
        }
    }

})
const pathsSlice = createSlice({
    name: "paths",
    initialState:{
        paths:[],
        pathToUpdate: null,
    },
    reducers:{
        setPaths: (state, action) => {
            return {...state, paths: action.payload} 
        },
        setPathToUpdate: (state,action) => {
            return {...state, pathToUpdate: action.payload}
        },
        addPath: (state, action) => {
            let array = [...state.paths, action.payload];
            state.paths = array;
        },
        updatePath: (state, action) => {
            const updatedPaths = state.paths.map((path) => {
                if (path.id === action.payload.id) {
                    return action.payload;
                }
                return path;
            });
            return { ...state, paths: updatedPaths };
        },
        deletePath: (state, action) => {
            const updatedpaths = state.paths.filter(
                (path) => path.id !== action.payload
            );
            return { ...state, paths: updatedpaths };
        },
        deletePaths: (state, action) => {
            const updatedPaths = state.paths.filter(
                (path) => !action.payload.includes(path.id)
            );
            return { ...state, paths: updatedPaths };
        }
    }
})

export const windowSlice = createSlice({
    name: "window",
    initialState: {
        triggerWindow: null,
        Refetch: false,
        windowType: null, // Can be create or update
        triggerType: "Location", // Can be locations or transfers
        selected: []
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
    addSelection,
    removeSelection,
    resetSelection,
    triggerRefetch,
    disableRefetch
} = windowSlice.actions;
  
export const {
    setLocations,
    setLocationToUpdate,
    addLocation,
    updateLocation,
    deleteLocation,
    deleteLocations
} = locationsSlice.actions;

export const {
    setPaths,
    setPathToUpdate,
    addPath,
    updatePath,
    deletePath,
    deletePaths
} = pathsSlice.actions;

export default locationsReducers;
