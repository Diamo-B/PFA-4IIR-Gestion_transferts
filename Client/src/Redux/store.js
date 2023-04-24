import {configureStore} from '@reduxjs/toolkit'
import {userAuthSlice} from './auth'

export default configureStore({
    reducer: {
        authUser: userAuthSlice.reducer
    }
})