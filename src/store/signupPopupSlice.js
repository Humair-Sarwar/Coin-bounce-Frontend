import { createSlice } from "@reduxjs/toolkit";


const signupPopupSlice = createSlice({
    name: 'signupPopup',
    initialState: false,
    reducers: {
        signupOpenPopup: (state, action)=>{
            
            return state = true;

        },
        signupClosePopup: (state)=>{
            return state = false;
        }
    }
});
export const {signupOpenPopup, signupClosePopup} = signupPopupSlice.actions;
export default signupPopupSlice.reducer;