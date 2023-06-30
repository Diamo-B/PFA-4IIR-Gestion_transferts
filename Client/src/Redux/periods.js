import { createSlice } from "@reduxjs/toolkit";

export const periods = createSlice({
    name:'periods_slice',
    initialState:{
        //? Top input
        readOnly: false,
        startingDate: {
            active: false
        },
        endingDate: {
            active: false
        },
        //? table
        periods: [],
        updateMode: {
            state: false,
            value: null
        },
        selectedPeriods: []
    },
    reducers:{
        setReadOnly: (state, action) => {
            state.readOnly = action.payload;
        },
        enableStartingDate: (state) => {
            state.startingDate.active = true;
        },
        disableStartingDate: (state) => {
            state.startingDate.active = false;
        },
        enableEndingDate: (state) => {
            state.endingDate.active = true;
        },
        disableEndingDate: (state) => {
            state.endingDate.active = false;
        },
        setPeriods: (state, action) => {
            state.periods = action.payload;
        },
        addPeriod: (state, action) => {
            state.periods.push(action.payload);
        },
        performUpdatePeriod: (state, action) => {
            state.periods = state.periods.map(period => period.id === action.payload.id ? action.payload : period);
        },
        removePeriod: (state, action) => {
            state.periods = state.periods.filter(period => period.id !== action.payload);
        },
        removePeriods: (state, action) => {
            state.periods = state.periods.filter(period => !action.payload.includes(period.id));
        },
        enableUpdateMode: (state, action) => {
            state.updateMode.state = true;
            state.updateMode.value = action.payload;
        },
        disableUpdateMode: (state) => {
            state.updateMode.state = false;
            state.updateMode.value = null;
        },
        setSelectedPeriods: (state, action) => {
            state.selectedPeriods = action.payload;
        },
        addSelectedPeriod: (state, action) => {
            state.selectedPeriods.push(action.payload);
        },
        removeSelectedPeriod: (state, action) => {
            state.selectedPeriods = state.selectedPeriods.filter(period => period.id !== action.payload);
        },
        clearSelectedPeriods: (state) => {
            state.selectedPeriods = [];
        },
    }
})

export const {
    setReadOnly,
    enableStartingDate,
    disableStartingDate,
    enableEndingDate,
    disableEndingDate,
    setPeriods,
    addPeriod,
    performUpdatePeriod,
    removePeriod,
    removePeriods,
    enableUpdateMode,
    disableUpdateMode,
    setSelectedPeriods,
    addSelectedPeriod,
    removeSelectedPeriod,
    clearSelectedPeriods
} = periods.actions;
export default periods.reducer;