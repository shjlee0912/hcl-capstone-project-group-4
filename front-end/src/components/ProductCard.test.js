import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QuantityUpdator } from './QuantityUpdator';
import { priceFormatter } from '../utilFunctions';
import { ProductCard } from './ProductCard';

describe("ViewCart", () => {

    let store;
    let product = {
        id: 1,
        name: "Product",
        image: "https://via.placeholder.com/500x200",
        brand: "BrandName",
        inventory: 10,
        price: 23.75,
        description: "this is a placeholder item",
    }

    const init = (cartItemId) => {
        const mockStore = configureStore();
        store = mockStore({
            cart: {
                items: [{product: {
                        id: cartItemId,
                        name: "Product",
                        image: "https://via.placeholder.com/500x200",
                        brand: "BrandName",
                        inventory: 10,
                        price: 23.75,
                        description: "this is a placeholder item",
                    }, quantity: 1}]
            }
        });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCard product={product}/>
                </BrowserRouter>
            </Provider>);
    }


    it('displays product image', () => {
        init(product.id+1);
        expect(screen.getByAltText(`image of ${product.name}`)).toBeDefined();
    });

    it('displays product name', () => {
        init(product.id+1);
        expect(screen.getByText(product.name)).toBeDefined();
    });

    it('displays product brand', () => {
        init(product.id+1);
        expect(screen.getByText(product.brand)).toBeDefined();
    });

    it('displays product price', () => {
        init(product.id+1);
        expect(screen.getByText(priceFormatter.format(product.price))).toBeDefined();
    });

    it('displays product description', () => {
        init(product.id+1);
        expect(screen.getByText(product.description)).toBeDefined();
    });

    it('displays product quantity input', () => {
        init(product.id+1);
        expect(screen.getByTestId("qty-input")).toBeDefined();
    });

    it('displays add to cart button and dispatches action when clicked', () => {
        init(product.id+1);
        const addButton = screen.getByText(/add to cart/i);
        expect(addButton).toBeDefined();
        userEvent.click(addButton);
        expect(store.getActions()[0].type).toEqual("cart/addToCart");
        store.clearActions();
    });

    it('displays a different button if item is already in the cart', async() => {
        init(product.id);
        const inCartButton = await screen.findByText(/in your cart/i);
        expect(inCartButton).toBeDefined();
        expect(screen.queryByText(/add to cart/i)).toBeNull();
        expect(screen.queryByTestId("qty-input")).toBeNull();
    });

});