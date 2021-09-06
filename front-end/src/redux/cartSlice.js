import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        /*Each item in the items list should have a product field and a quantity field.
            The product field will have same structure used in the catalog, as returned from the backend product model
                (product_id, name, brand, inventory, price, description, rating?, image?)
            The quantity is the number of items in the cart  
            
            field names might still need to be updated
        */
        items: [
            // {
            //     product: {
            //         id: 1,
            //         name: "Product",
            //         image: "https://via.placeholder.com/500x200",
            //         brand: "BrandName",
            //         inventory: 40,
            //         price: 23.75,
            //         description: "this is a placeholder item",
            //     },
            //     quantity: 3,
            // },
            // {
            //     product: {
            //         id: 2,
            //         name: "Product2",
            //         image: "https://via.placeholder.com/200x300",
            //         brand: "BrandName2",
            //         inventory: 4,
            //         price: 400.89,
            //         description: "this is a placeholder item with a longer string to describe it",
            //     },
            //     quantity: 1,
            // },
        ]
    },
    reducers: {
        addToCart(state, action) {
            let {product, quantity} = action.payload;
            quantity = parseInt(quantity);
            if(state.items.filter( item => item.product.id===product.id ).length===0) {
                state.items.push({
                    product: product,
                    quantity: quantity
                });
            }
        },

        removeFromCart(state, action) {
            const productId = action.payload;
            state.items = state.items.filter( item => item.product.id!=productId );

        },

        updateQuantity(state, action) {
            const {productId, quantity} = action.payload;
            let toChange;
            if(toChange = state.items.find( item => item.product.id===productId )) {
                toChange.quantity = quantity;
            }
        },

        incrementQuantity(state, action) {
            const productId = action.payload;
            let toChange;
            if(toChange = state.items.find( item => item.product.id===productId )) {
                toChange.quantity += 1;
            }
        },

        decrementQuantity(state, action) {
            const productId = action.payload;
            let toChange;
            if(toChange = state.items.find( item => item.product.id===productId )) {
                toChange.quantity -= 1;
            }
        }
    },

});

export const { addToCart, removeFromCart, updateQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

