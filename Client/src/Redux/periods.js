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
        refetch: false,
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
    removePeriod
} = periods.actions;
export default periods.reducer;