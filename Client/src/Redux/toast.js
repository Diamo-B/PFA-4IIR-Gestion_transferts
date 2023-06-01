import { createSlice } from "@reduxjs/toolkit";

export const ToastSlice = createSlice({
    name: "toast",
    initialState: {
        toast:{
            type: "",
            message: "",
            active: false,
            reload: false
        }
    },
    reducers: {
        SetToast: (state, action) => {
            let toast= {
                type: action.payload.type,
                message: action.payload.message,
                active: true,
                reload: action.payload.reload,
            }
            return { ...state, toast: toast };
        },
        disableToast: (state) => {
            let toast= {
                type: "",
                message: "",
                active: false,
                reload: false
            }
            return { ...state, toast: toast };
        },
    },
});

export const {
    SetToast,
    disableToast,
} = ToastSlice.actions;

export default ToastSlice.reducer;
