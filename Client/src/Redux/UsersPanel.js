import { createSlice } from "@reduxjs/toolkit";

export const usersPanelSlice = createSlice({
    name: "usersPanel_slice",
    initialState: {
        showCreateUserPanel: false,
        showUpdateUserPanel: {
            value: false,
            user: null
        },
        usersData: [],
        fetchingType: "all",
        usersFetchingErrors: [],
        toastType: "Error",
        selectedUsers: []
    },
    reducers: {
        show: (state) => {
            state.showCreateUserPanel = true;
        },
        hide: (state) => {
            state.showCreateUserPanel = false;
        },
        showUpdate: (state,action) => {
            state.showUpdateUserPanel.value = true;
            state.showUpdateUserPanel.user = action.payload
        },
        hideUpdate: (state) => {
            state.showUpdateUserPanel.value = false;
            state.showUpdateUserPanel.user = {}
        },
        setUsersData: (state, action) => {
            state.usersData = action.payload;
        },
        setFetchingType: (state, action) => {
            state.fetchingType = action.payload;
        },
        setUsersFetchingErrors: (state, action) => {
            state.usersFetchingErrors.push(action.payload);
        },
        resetFetchingErrors: (state) => {
            state.usersFetchingErrors = [];
        },
        setToastType: (state, action) => {
            state.toastType = action.payload;
        },
        setSelectedUsers: (state, action) => {
            state.selectedUsers.push(action.payload)
        },
        removeUserFromSelection: (state, action) => {
            state.selectedUsers = state.selectedUsers.filter(user => user.id !== action.payload.id)
        },
        resetSelectedUsers: (state) => {
            state.selectedUsers = [];
        }
    },
});

export const {
    show,
    hide,
    showUpdate,
    hideUpdate,
    setUsersData,
    setFetchingType,
    setUsersFetchingErrors,
    resetFetchingErrors,
    setToastType,
    setSelectedUsers,
    removeUserFromSelection,
    resetSelectedUsers
} = usersPanelSlice.actions;
export default usersPanelSlice.reducer;
