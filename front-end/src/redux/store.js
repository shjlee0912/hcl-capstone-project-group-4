import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import catalogReducers from './catalogSlice';
import productReducer from './products';

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        catalog: catalogReducers,
    },
});
