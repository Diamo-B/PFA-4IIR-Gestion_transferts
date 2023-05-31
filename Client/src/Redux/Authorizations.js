import { createSlice } from "@reduxjs/toolkit";

export const authorizationsSlice = createSlice({
    name:'authorization_slice',
    initialState:{
        Agents: [],
        options: [],
        selectedCat: null,
        AgentsXCatsXPerms: [], //? this array will hold the permissions for each agent according to the selected category
        SelectedPermissions: [], //? this array will hold each agent with it's permissions for the currently selected category 
        isLoading: true,
        modifyMode: false,
    },
    reducers:{
        setAgents: (state,action) => {
          state.Agents = action.payload;
        },
        setOptions: (state,action) => {
            state.options = action.payload;
        },
        setSelectedCat: (state,action) => {
            state.selectedCat = action.payload;
        },
        setAgentsXCatsXPerms: (state, action) => {
            state.AgentsXCatsXPerms = action.payload
        },
        setSelectedPermissions: (state, action) => {
          state.SelectedPermissions = action.payload; 
        },
        addPermissionToAgent: (state,action) => {
            let {agentId, newPermission} = action.payload;
            const agentIndex = state.SelectedPermissions.findIndex((item) => item.agentId === agentId);
            if(agentIndex !== -1)
            {
                state.SelectedPermissions[agentIndex].permissions.push(newPermission);
            }
        },
        removePermissionFromAgent: (state, action) => {
            let { agentId, permissionToRemove } = action.payload;
            const agentIndex = state.SelectedPermissions.findIndex((item) => item.agentId === agentId);
          
            if (agentIndex !== -1) {
              state.SelectedPermissions[agentIndex].permissions = state.SelectedPermissions[agentIndex].permissions.filter(
                (item) => item !== permissionToRemove
              );
            }
        },          
        setIsLoading: (state,action) =>{
            state.isLoading = action.payload;
        },  
        triggerModifyMode: (state) => {
            state.modifyMode = !state.modifyMode
        },
        disableModifyMode: (state) => {
            state.modifyMode = false
        }
    }
})

export const {
    setAgents,
    setOptions,
    setSelectedCat,
    setAgentsXCatsXPerms,
    setSelectedPermissions,
    addPermissionToAgent,
    removePermissionFromAgent,
    setIsLoading,
    triggerModifyMode,
    disableModifyMode
} = authorizationsSlice.actions;
export default authorizationsSlice.reducer;