import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import catalogReducers from './catalogSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        catalog: catalogReducers,
    },
});