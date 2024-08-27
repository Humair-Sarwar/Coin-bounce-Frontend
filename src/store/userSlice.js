import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        username: '',
        email: '',
        auth: false
    },
    reducers: {
        setUser: (state, action)=>{
            const {id, username, email, auth} = action.payload;
            state.id = id;
            state.username = username;
            state.email = email;
            state.auth = auth;
           
            
        },
        resetUser: (state)=>{
            state.id = '';
            state.username = '',
            state.email = '',
            state.auth = false
        }
    }
});
export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;