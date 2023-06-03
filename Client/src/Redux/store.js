import {configureStore} from '@reduxjs/toolkit'
import {userAuthSlice} from './auth'
import { usersPanelSlice } from './UsersPanel'
import datesReducer from './dates'
import { authorizationsSlice } from './Authorizations'
import locationsReducers from "./locations"
import { confirmationPanel } from "./confirmationPanel";
import { ToastSlice } from './toast'
import vehiculesReducer from './Transportation'

export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer,
        travelDates: datesReducer,
        userPanel: usersPanelSlice.reducer,
        authorizationPanel: authorizationsSlice.reducer,
        mapPanel: locationsReducers,
        transportation: vehiculesReducer,
        confirmationPanel: confirmationPanel.reducer,
        toast: ToastSlice.reducer
    },
})