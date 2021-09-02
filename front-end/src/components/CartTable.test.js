import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CartTable } from './CartTable';
import { priceFormatter } from '../utilFunctions';

describe("CartTable", () => {

    let store;

    beforeEach( () => {
        const mockStore = configureStore();
        store = mockStore({cart: {
            items: [
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
                },
                {
                    product: {
                        id: 2,
                        name: "Product2",
                        image: "https://via.placeholder.com/200x300",
                        brand: "BrandName2",
                        inventory: 4,
                        price: 400.89,
                        description: "this is a placeholder item with a longer string to describe it",
                    },
                    quantity: 1,
                },
            ]
        }});
        render(<Provider store={store}>
            <BrowserRouter>
                <CartTable/>
            </BrowserRouter>
        </Provider>)
    });

    it('displays the name of a product', () => {
        expect(screen.getAllByText("Product")).toHaveLength(1);
    });

    it('displays name heading', () => {
        expect(screen.getByText(/name/i)).toBeDefined();
    })

    it('displays the image of a product', () => {
        expect(screen.getAllByAltText("image of Product")).toHaveLength(1);
    });

    it('displays the description of a product', () => {
        expect(screen.getAllByText("this is a placeholder item")).toHaveLength(1);
    });

    it('displays the price of a product', () => {
        expect(screen.getAllByText(priceFormatter.format(23.75))).toHaveLength(1);
    });

    //this cannot be tested by any of the means provided by the library
    // it('displays the a quantity updators', () => {
    //     expect(screen.getAllByTestId("updator")).toHaveLength(2);
    // });

    it('displays the total for a product', () => {
        expect(screen.getAllByText(priceFormatter.format(23.75*3))).toHaveLength(1);
    });

    it('displays the correct order total', () => {
        expect(screen.getByText(priceFormatter.format(23.75*3+400.89))).toBeDefined();
    })

    it('dispatches action to remove item from cart when remove button is clicked', () => {
        userEvent.click(screen.getAllByText("remove")[0]);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        store.clearActions();
    });

});