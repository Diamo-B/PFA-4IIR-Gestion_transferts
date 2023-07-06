import { createSlice } from "@reduxjs/toolkit";

export const activePaths = createSlice({
    name:'activePaths_slice',
    initialState:{
        GenActivePathsData:[],
        distinctDepartures:[],
        distinctArrivals:[]
    },
    reducers:{
        setGenActivePaths: (state, action) => {          
            return { ...state, GenActivePathsData: action.payload};
        },
        setUsableData: (state, action) => {
            let departureSet = new Set();
            let arrivalSet = new Set();
            let departuresArray = [];
            let arrivalsArray = [];
            action.payload.map((item) => {
                if(!departureSet.has(item.departure))
                {
                    departuresArray.push({id: item.id, departure: item.departure});
                    departureSet.add(item.departure);
                }
                else
                {
                    // find th item.departure inside the array and add the id to the id already present in the array
                    departuresArray.map((item2) => {
                            if(item2.departure === item.departure)
                            {
                                item2.id = item2.id + ',' + item.id;
                            }
                        }
                    )
                }
                if(!arrivalSet.has(item.arrival))
                {
                    arrivalsArray.push({id: item.id, arrival: item.arrival});
                    arrivalSet.add(item.arrival);
                }
                else
                {
                    arrivalsArray.map((item2) => {
                            if(item2.arrival === item.arrival)
                            {
                                item2.id = item2.id + ',' + item.id;
                            }
                        }
                    )
                }
            })
            return { ...state, distinctDepartures: departuresArray, distinctArrivals: arrivalsArray};
        },
        setDistinctDepartures: (state, action) => {
            return { ...state, distinctDepartures: action.payload};
        },
        setDistinctArrivals: (state, action) => {
            return { ...state, distinctArrivals: action.payload};
        }
    }
})

export const {
    setGenActivePaths,
    setUsableData,
    setDistinctDepartures,
    setDistinctArrivals
} = activePaths.actions;
export default activePaths.reducer;