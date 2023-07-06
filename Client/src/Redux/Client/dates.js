import { createSlice, combineReducers } from "@reduxjs/toolkit";
import {
  addHours,
  subHours,
  addMinutes,
  subMinutes,
} from "date-fns";

const currentDate = new Date();
const UnixDate = currentDate.getTime();

//Doing : combining dates & times
export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    departureDate: {
      value: UnixDate,
      isModified: false,
    },
    arrivalDate: {
      value: UnixDate,
      isModified: false,
    }
  },
  reducers: {
    setDepartureModifiedTrue: (state) => {
      state.departureDate.isModified = true;
    },
    setArrivalModifiedTrue: (state) => {
      state.arrivalDate.isModified = true;
    },
    setDepartureDate: (state, action) => {
      state.departureDate.value = action.payload
      state.departureDate.isModified = true;
    },
    setArrivalDate: (state, action) => {
      state.arrivalDate.value = action.payload;
      state.arrivalDate.isModified = true;
    },
    addDepartureHour: (state) => {
      state.departureDate.value = addHours(state.departureDate.value,1).getTime();
    },
    subDepartureHour: (state) => {
      state.departureDate.value = subHours(state.departureDate.value,1).getTime();
    },
    addDepartureMinute: (state) => {
      state.departureDate.value = addMinutes(state.departureDate.value,1).getTime();
    },
    subDepartureMinute: (state) => {
      state.departureDate.value = subMinutes(state.departureDate.value,1).getTime();
    },
    addArrivalHour: (state) => {
      state.arrivalDate.value = addHours(state.arrivalDate.value,1).getTime();
    },
    subArrivalHour: (state) => {
      state.arrivalDate.value = subHours(state.arrivalDate.value,1).getTime();
    },
    addArrivalMinute: (state) => {
      state.arrivalDate.value = addMinutes(state.arrivalDate.value,1).getTime();
    },
    subArrivalMinute: (state) => {
      state.arrivalDate.value = subMinutes(state.arrivalDate.value,1).getTime();
    }
    
  },
});

//* Reducer config ---------------------------------------------------------------------------------
const datesReducer = combineReducers({
  itinerary: itinerarySlice.reducer,
});

export const {
  resetImproperDate,
  setDepartureModifiedTrue,
  setArrivalModifiedTrue,
  setDepartureDate,
  setArrivalDate,
  addDepartureHour,
  subDepartureHour,
  addDepartureMinute,
  subDepartureMinute,
  addArrivalHour,
  subArrivalHour,
  addArrivalMinute,
  subArrivalMinute,
} = itinerarySlice.actions;

export default datesReducer;
