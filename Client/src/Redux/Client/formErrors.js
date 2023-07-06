import { createSlice } from "@reduxjs/toolkit";

export const formErrors = createSlice({
    name:'formErrors_slice',
    initialState:{
        Departure: null,
        Arrival: null,
        DepartureDate: null,
        ReturnDate: null,
        Travelers: null,
        Luxury: null,
    },
    reducers:{
        setDepartureError: (state, action) => {
            state.Departure = action.payload;
        },
        setArrivalError: (state, action) => {
            state.Arrival = action.payload;
        },
        setDepartureDateError: (state, action) => {
            state.DepartureDate = action.payload;
        },
        setReturnDateError: (state, action) => {
            state.ReturnDate = action.payload;
        },
        setTravelersError: (state, action) => {
            state.Travelers = action.payload;
        },
        setLuxuryError: (state, action) => {
            state.Luxury = action.payload;
        }
    }
})

export const {
    
} = formErrors.actions;
export default formErrors.reducer;