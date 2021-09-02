import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductsService from '../services/products.service';


export const getProducts = createAsyncThunk (
    'products/getProducts',
    async (arg, { getState }) => {
        const filter = getState(state => state.catalog.filter);
        const response = await ProductsService.getProducts();
        return response.data;
    }
)

export const catalogSlice = createSlice({

    name: 'catalog',
    initialState: {
        loaded: false,
        error: false,
        products:  [
            {
                    id: 1,
                    name: "Product",
                    image: "https://via.placeholder.com/500x200",
                    brand: "BrandName",
                    inventory: 40,
                    price: 23.75,
                    description: "this is a placeholder item",
            },
            {
                    id: 2,
                    name: "Product2",
                    image: "https://via.placeholder.com/200x300",
                    brand: "BrandName2",
                    inventory: 4,
                    price: 400.89,
                    description: "this is a placeholder item with a longer string to describe it",
            },
            {
                    id: 3,
                    name: "Product3",
                    image: "https://via.placeholder.com/20x20",
                    brand: "BrandName3",
                    inventory: 0,
                    price: 0.99,
                    description: "this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page",
            },
            {
                id: 4,
                name: "Product4",
                image: "https://via.placeholder.com/70x50",
                brand: "BrandName4",
                inventory: 340,
                price: 5.87,
                description: "this is a fourth placeholder item",
        },
        ],
        filters: [], //filtering mechanism yet to be determined
        sort: {}, //sorting mechanism yet to be determined
    },
    reducers: {
        //updates the filter and marks the products as not loaded
        filter(state, action) {
            state.filter = action.payload;
            state.loaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loaded = false;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = true;
        });
    }
});

export const { filter } = catalogSlice.actions;

export default catalogSlice.reducer;
