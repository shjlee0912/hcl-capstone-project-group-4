import React from 'react';
import { render, screen } from '@testing-library/react';
import {ViewCart} from './ViewCart';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe("ViewCart", () => {

    const init = (cartItems) => {
        const store = mockStore({
            cart: {
                items: cartItems
            }
        });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ViewCart/>
                </BrowserRouter>
            </Provider>);
    }

    const mockStore = configureStore();

    it('renders without crashing', () => {
        init([]);
    });

    it("renders page title", () => {
        init([]);
        expect(screen.findByTestId("title")).toBeDefined();
    });

    it("displays a message if cart is empty", () => {
        init([]);
        expect(screen.queryByText("your cart is currently empty")).toBeDefined();
        expect(screen.queryByTestId("cart-table")).toBeNull();
    });

    it("displays a CartTable if cart is not empty", () => {
        init([
                    {
                        product: {
                            id: 1,
                            name: "Product",
                            image: "https://via.placeholder.com/500x200",
                            brand: "BrandName",
                            inventory: 40,
                            price: 23.75,
                            description: "this is a placeholder item",
                        },
                        quantity: 3,
                    }
                ]);
        expect(screen.queryByText("your cart is currently empty")).toBeNull();
        expect(screen.queryByTestId("cart-table")).toBeDefined();
    });

});