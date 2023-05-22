import {configureStore} from '@reduxjs/toolkit'
import {userAuthSlice} from './auth'
import { usersPanelSlice } from './UsersPanel'
import datesReducer from './dates'
import { authorizationsSlice } from './Authorizations'
import { locationsSlice } from "./locations"
import { othersSlice } from "./others";

export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer,
        travelDates: datesReducer,
        userPanel: usersPanelSlice.reducer,
        authorizationPanel: authorizationsSlice.reducer,
        locationPanel: locationsSlice.reducer,
        others: othersSlice.reducer
    },
})