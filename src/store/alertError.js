import { createSlice } from "@reduxjs/toolkit";

const alertErrorSlice = createSlice({
    name: 'error',
    initialState: {
        errorState: false,
        message: ''
    },
    reducers: {
        setErrorState: (state, action)=>{
            let {errorState, message} = action.payload;
            state.errorState = errorState;
            state.message = message;
            console.log(action.payload, 'uuuuuuuuuu');
            
        }
    }
});
export const {setErrorState} = alertErrorSlice.actions;
export default alertErrorSlice.reducer;