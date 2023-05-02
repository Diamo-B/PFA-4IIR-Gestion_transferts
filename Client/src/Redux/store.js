import {configureStore} from '@reduxjs/toolkit'
import {userAuthSlice} from './auth'
import { usersPanelSlice } from './UsersPanel'
import datesReducer from './dates'

export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer,
        travelDates: datesReducer,
        userPanel: usersPanelSlice.reducer
    } ,
})