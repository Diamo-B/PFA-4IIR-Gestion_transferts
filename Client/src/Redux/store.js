import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit'
import {userAuthSlice} from './auth'
import datesReducer from './dates'

const ignoredPaths = ['tarvelDates.selectedDay'];

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    ignoredPaths: ignoredPaths,
  });

export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer,
        tarvelDates: datesReducer, 
    } ,
    middleware: [serializableMiddleware],
})