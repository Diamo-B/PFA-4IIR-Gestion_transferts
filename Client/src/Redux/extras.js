import { createSlice } from "@reduxjs/toolkit";

export const extras = createSlice({
    name:'extras_slice',
    initialState:{
        //? Extra Types
        types: [],
        selectedType: null,
        //? Extras
        extras: [],
        automaticExtras : [],
        specialExtras : [],
        extrasToShow: [],
        selectedExtras: [],
        paramsPanel: null,
        //? Window
        createMode: false,
        updateMode: {
            value: false,
            id: null
        }
    },
    reducers:{
        //? Extra Types
        setTypes: (state, action) => {
            state.types = action.payload;
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        },
        //? Extras
        setExtras: (state, action) => {
            state.extras = action.payload;
        },
        addExtra: (state, action) => {
            state.extras.push(action.payload);
        },
        updateExtra: (state, action) => {
            const index = state.extras.findIndex((extra) => extra.id === action.payload.id);
            state.extras[index] = action.payload;
        },
        deleteExtra: (state, action) => {
            state.extras = state.extras.filter((extra) => extra.id !== action.payload);
        },
        deleteExtras: (state, action) => {
            state.extras = state.extras.filter((extra) => !action.payload.includes(extra.id));
        },
        /*resetExtras: (state) => {
            state.extras = [];
        }, */
        setAutomaticExtras : (state, action) => {
            return {...state, automaticExtras: action.payload}
        },
        setSpecialExtras : (state, action) => {
            return {...state, specialExtras: action.payload}
        },
        setExtrasToShow : (state, action) => {
            state.extrasToShow = action.payload;
        },
        setSelectedExtras: (state, action) => {
            state.selectedExtras = action.payload;
        },
        addToSelectedExtras: (state, action) => {
            state.selectedExtras.push(action.payload);
        },
        removeFromSelectedExtras: (state, action) => {
            console.log(action.payload);
            let filtered = state.selectedExtras.filter((extra) => extra !== action.payload);
            console.log(filtered);
            return {...state, selectedExtras: filtered}
        },
        resetSelectedExtras: (state) => {
            state.selectedExtras = [];
        },
        openParamsPanel: (state,action) => {
            state.paramsPanel = action.payload;
        },
        closeParamsPanel: (state) => {
            state.paramsPanel = null;
        },
        //? Window
        enableCreateMode : (state) => {
            state.createMode = true;
        },
        disableCreateMode : (state) => {
            state.createMode = false;
        },
        enableUpdateMode : (state, action) => {
            state.updateMode.value = true;
            state.updateMode.id = action.payload;
        },
        disableUpdateMode : (state) => {
            state.updateMode.value = false;
            state.updateMode.id = null;
        }
    }
})

export const {
    setTypes,
    setExtras,
    addExtra,
    updateExtra,
    deleteExtra,
    deleteExtras,
    //resetExtras,
    setAutomaticExtras,
    setSpecialExtras,
    setExtrasToShow,
    setSelectedExtras,
    addToSelectedExtras,
    removeFromSelectedExtras,
    resetSelectedExtras,
    setSelectedType,
    openParamsPanel,
    closeParamsPanel,
    enableCreateMode,
    disableCreateMode,
    enableUpdateMode,
    disableUpdateMode
} = extras.actions;
export default extras.reducer;