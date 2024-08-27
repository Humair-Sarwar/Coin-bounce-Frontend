import { createSlice } from "@reduxjs/toolkit";


const loginPopupSlice = createSlice({
    name: 'loginPopup',
    initialState: false,
    reducers: {
        loginOpenPopup: (state)=>{
            
            return state = true;

        },
        loginClosePopup: (state)=>{
            return state = false;
        }
    }
});
export const {loginOpenPopup, loginClosePopup} = loginPopupSlice.actions;
export default loginPopupSlice.reducer;