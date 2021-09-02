import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';

export const login = createAsyncThunk(
    'login',
    async ({username, password}) => {
        const response = await AuthService.login(username, password);
        return response.data;
    }
)

export const register = createAsyncThunk(
    'register',
    async (user) => {
        const response = await AuthService.register(user);
        return response.data;
    }
)

export const logout = createAsyncThunk(
    'logout',
    async () => {
        const response = await AuthService.logout();
        return response.data;
    }
)

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        loggedIn: false,
        waiting: false,
        loginFailed: false,
        logoutFailed: false,
        user: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        //need to add more reducers and asynchrounous authentication api calls
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loginFailed = false;
            state.waiting = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.waiting = false;
            if(action.payload.status==200) {
                state.loggedIn = true;
            } else {
                state.loginFailed = true;
            }
        });
        builder.addCase(login.rejected, (state) => {
            state.waiting = false;
            state.loginFailed = true;
        });

        builder.addCase(register.pending, (state) => {
            state.loginFailed = false;
            state.loggedIn = false
            state.waiting = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.waiting = false;
            if(action.payload.status==200) { //or 201?
                state.loggedIn = true;
            } else {
                state.loginFailed = true;
            }
        });
        builder.addCase(register.rejected, (state) => {
            state.waiting = false;
            state.loginFailed = true;
        });

        builder.addCase(logout.pending, (state) => {
            state.logoutFailed = false;
            state.loggedIn = false
            state.waiting = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.waiting = false;
            if(action.payload.status==200) {
                state.loggedIn = false;
                state.user = null;
            } else {
                state.logoutFailed = true;
            }
        });
        builder.addCase(logout.rejected, (state) => {
            state.waiting = false;
            state.logoutFailed = true;
        });
    }
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
