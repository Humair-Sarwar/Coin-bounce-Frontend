import { createSlice } from "@reduxjs/toolkit";

const alertSuccessSlice = createSlice({
    name: 'success',
    initialState: {
        successState: false,
        message: ''
    },
    reducers: {
        setSuccessState: (state, action)=>{
            let {successState, message} = action.payload;
            state.successState = successState;
            state.message = message;
            
        }
    }
});
export const {setSuccessState} = alertSuccessSlice.actions;
export default alertSuccessSlice.reducer;