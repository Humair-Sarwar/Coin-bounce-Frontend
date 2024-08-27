import { configureStore } from "@reduxjs/toolkit";
import signupPopup from './signupPopupSlice';
import loginPopup from './loginPopupSlice';
import user from './userSlice';
import error from './alertError';
import success from './alertSuccess';
import switchCheck from './switchSlice'

const store = configureStore({
    reducer: {
        signupPopup,
        loginPopup,
        user,
        error,
        success,
        switchCheck
    }
});

export default store;