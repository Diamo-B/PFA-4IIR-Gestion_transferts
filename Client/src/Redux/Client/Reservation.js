import { createSlice } from "@reduxjs/toolkit";

export const reservations = createSlice({
    name:'reservations_slice',
    initialState:{
        step1: true,
        step2: false,
        recommendedVehicles: [false],
    },
    reducers:{
        activateStep1: (state) => {
            state.step1 = true;
            state.step2 = false;
        },
        activateStep2: (state) => {
            state.step1 = false;
            state.step2 = true;
        },
        setRecommendedVehicles: (state, action) => {
            state.recommendedVehicles = action.payload;
        }
    }
})

export const {
    activateStep1,
    activateStep2,
    setRecommendedVehicles
} = reservations.actions;
export default reservations.reducer;