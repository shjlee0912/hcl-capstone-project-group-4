import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        loggedIn: false,
        loginFailed: false,
        roles: [],
        username: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        //need to add more reducers and asynchrounous authentication api calls
    },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
