import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';

export const login = createAsyncThunk(
    'login',
    async ({username, password}) => {
        const response = await AuthService.login(username, password);
        return response;
    }
)

export const register = createAsyncThunk(
    'register',
    async (user) => {
        const response = await AuthService.register(user);
        return response;
    }
)

export const getUserInfo = createAsyncThunk(
    'getUserInfo',
    async () => {
        console.log("getting user info")
        if(localStorage.getItem("jwt")) {
            console.log("still getting user info")
            const response = await AuthService.getUserInfo();
            return response;
        }
    }
)

const initialState = {
    loggedIn: localStorage.getItem('jwt')?true:false,
    waiting: false,
    loginFailed: false,
    logoutFailed: false,
    user: null,
};

export const authSlice = createSlice({

    name: 'auth',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("jwt");
            state.loggedIn = false;
            state.waiting = false;
            state.loginFailed = false;
            state.logoutFailed = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loginFailed = false;
            state.waiting = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.waiting = false;
            if(action.payload.status==200) {
                localStorage.setItem("jwt", action.payload.data.token);
                state.loggedIn = true;
            } else {
                state.loginFailed = true;
            }
        });
        builder.addCase(login.rejected, (state, action) => {
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
            if(action.payload.status===200) {
                localStorage.setItem("jwt", action.payload.data.token);
                state.loggedIn = true;
            } else {
                state.loginFailed = true;
            }
        });
        builder.addCase(register.rejected, (state) => {
            state.waiting = false;
            state.loginFailed = true;
        });

        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            if(action.payload) {
                if(action.payload.status===200) {
                    state.loggedIn = true;
                    state.waiting = false;
                    state.loginFailed = false;
                    state.logoutFailed = false;
                    state.user = action.payload.data;
                } else {
                    localStorage.removeItem("jwt");
                    state.loggedIn = false;
                    state.waiting = false;
                    state.loginFailed = false;
                    state.logoutFailed = false;
                    state.user = null;
                }
            }
        });
        builder.addCase(getUserInfo.rejected, (state) => {
            localStorage.removeItem("jwt");
            state.loggedIn = false;
            state.waiting = false;
            state.loginFailed = false;
            state.logoutFailed = false;
            state.user = null;
        });
    }
});

export const { setUsername, logout } = authSlice.actions;

export default authSlice.reducer;
