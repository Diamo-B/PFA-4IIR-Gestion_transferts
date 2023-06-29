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
        }
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
        removePeriod: (state, action) => {
            state.periods = state.periods.filter(period => period.id !== action.payload);
        },
        enableUpdateMode: (state, action) => {
            state.updateMode.state = true;
            state.updateMode.value = action.payload;
        },
        disableUpdateMode: (state) => {
            state.updateMode.state = false;
            state.updateMode.value = null;
        }
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
    removePeriod,
    enableUpdateMode,
    disableUpdateMode
} = periods.actions;
export default periods.reducer;