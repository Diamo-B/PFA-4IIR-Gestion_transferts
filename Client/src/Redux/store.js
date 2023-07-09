import {configureStore} from '@reduxjs/toolkit'
import {userAuthSlice} from './Gen/auth'
import { usersPanelSlice } from './Admin/UsersPanel'
import datesReducer from './Client/dates'
import { authorizationsSlice } from './Admin/Authorizations'
import locationsReducers from "./Admin/locations"
import { confirmationPanel } from "./Gen/confirmationPanel";
import { ToastSlice } from './Gen/toast'
import vehiculesReducer from './Admin/Transportation'
import {periods} from './Admin/periods'
import {extras} from './Admin/extras'
import { loading } from './Gen/Loading'
import {activePaths} from './Client/activePaths'
import {reservations} from './Client/Reservation'
export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer,
        travelDates: datesReducer,
        userPanel: usersPanelSlice.reducer,
        authorizationPanel: authorizationsSlice.reducer,
        mapPanel: locationsReducers,
        transportation: vehiculesReducer,
        confirmationPanel: confirmationPanel.reducer,
        periods: periods.reducer,
        extras: extras.reducer,
        toast: ToastSlice.reducer,
        reservation: reservations.reducer,
        activePaths: activePaths.reducer,
        loading: loading.reducer,
    },
})