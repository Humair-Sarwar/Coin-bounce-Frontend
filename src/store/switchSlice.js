import { createSlice } from "@reduxjs/toolkit";


const switchSlice = createSlice({
    name: 'switchCheck',
    initialState: false,
    reducers: {
        setSwitch: (state, action)=>{
            console.log(action.payload, 'tttttttttttt');
            return action.payload;
        }
    }
});

export const {setSwitch} = switchSlice.actions;
export default switchSlice.reducer;