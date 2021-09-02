import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QuantityUpdator } from './QuantityUpdator';

describe("ViewCart", () => {

    let store;

    let init = (id, quantity, inventory) => {
        store = mockStore({
            cart: {
                items: [{ product: {
                    id: 1,
                    name: "Product",
                    image: "https://via.placeholder.com/500x200",
                    brand: "BrandName",
                    inventory: inventory,
                    price: 23.75,
                    description: "this is a placeholder item",
                },
                quantity: quantity,}]
            }
        });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <QuantityUpdator prodId={id}/>
                </BrowserRouter>
            </Provider>);
    }

    const mockStore = configureStore();

    it('renders without crashing', () => {
        init(1,1,1);
    });

    it("renders invalid message for invalid item", () => {
        init(2,1,1);
        expect(screen.getByText("invalid item")).toBeDefined();
    });

    it("dispatches the correct action when increment button is clicked", () => {
        init(1,1,3);
        const incrementButton = screen.getByTestId("inc-btn");
        userEvent.click(incrementButton);
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toEqual("cart/incrementQuantity");
        store.clearActions();
     });

    it("dispatches the correct action when decrement button is clicked", () => {
        init(1,2,3);
        const decrementButton = screen.getByTestId("dec-btn");
        userEvent.click(decrementButton);
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toEqual("cart/decrementQuantity");
        store.clearActions();
    });

    it("does not dispatch decrement if quantity is too low", () => {
        init(1,1,3);
        const decrementButton = screen.getByTestId("dec-btn");
        userEvent.click(decrementButton);
        expect(store.getActions()).toHaveLength(0);
        store.clearActions();
    });

    it('has error class on input if quantity is invalid', () => {
        init(1,5,3);
        const textInput = screen.getByTestId("quant-input");
        expect(textInput.classList.contains("insufficient-error")).toBe(true);
    })


});