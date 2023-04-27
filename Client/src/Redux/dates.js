import { createSlice, combineReducers } from "@reduxjs/toolkit";
import {
  format,
  parseISO,
  parse,
  addHours,
  subHours,
  addMinutes,
  subMinutes,
} from "date-fns";

const currentDate = new Date();
const formattedDate = format(currentDate, "dd-MM-yyyy");
const formattedTime = format(currentDate, "HH:mm");

//Done: calandar selected date
export const selectedDaySlice = createSlice({
  name: "selectedDay",
  initialState: {
    value: null,
  },
  reducers: {
    setSelectedDay: (state, action) => {
      state.value = parseISO(action.payload);
    },
  },
});

//Doing : combining dates & times
export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    departureDate: {
      value: formattedDate,
      isModified: false,
    },
    departureTime: {
      value: formattedTime,
      isModified: false,
    },
    arrivalDate: {
      value: formattedDate,
      isModified: false,
    },
    arrivalTime: {
      value: formattedTime,
      isModified: false,
    },
  },
  reducers: {
    setDepartureModifiedTrue: (state) => {
      state.departureDate.isModified = true;
      state.departureTime.isModified = true;
    },
    setArrivalModifiedTrue: (state) => {
      state.arrivalDate.isModified = true;
      state.arrivalTime.isModified = true;
    },
    setDepartureDate: (state, action) => {
      state.departureDate.value = action.payload;
      state.departureDate.isModified = true;
    },
    setArrivalDate: (state, action) => {
      state.arrivalDate.value = action.payload;
      state.arrivalDate.isModified = true;
    },
    addDepartureHour: (state) => {
      state.departureTime.value = format(
        addHours(parse(state.departureTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.departureTime.isModified = true;
    },
    subDepartureHour: (state) => {
      state.departureTime.value = format(
        subHours(parse(state.departureTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.departureTime.isModified = true;
    },
    addDepartureMinute: (state) => {
      state.departureTime.value = format(
        addMinutes(parse(state.departureTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.departureTime.isModified = true;
    },
    subDepartureMinute: (state) => {
      state.departureTime.value = format(
        subMinutes(parse(state.departureTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.departureTime.isModified = true;
    },
    addArrivalHour: (state) => {
      state.arrivalTime.value = format(
        addHours(parse(state.arrivalTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.arrivalTime.isModified = true;
    },
    subArrivalHour: (state) => {
      state.arrivalTime.value = format(
        subHours(parse(state.arrivalTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.arrivalTime.isModified = true;
    },
    addArrivalMinute: (state) => {
      state.arrivalTime.value = format(
        addMinutes(parse(state.arrivalTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.arrivalTime.isModified = true;
    },
    subArrivalMinute: (state) => {
      state.arrivalTime.value = format(
        subMinutes(parse(state.arrivalTime.value, "HH:mm", new Date()), 1),
        "HH:mm"
      );
      state.arrivalTime.isModified = true;
    },
  },
});

//* Reducer config ---------------------------------------------------------------------------------
const datesReducer = combineReducers({
  itinerary: itinerarySlice.reducer,
  selectedDay: selectedDaySlice.reducer,
});

export const {
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

export const { setSelectedDay } = selectedDaySlice.actions;
export default datesReducer;
