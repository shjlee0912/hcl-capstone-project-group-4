import React from 'react';
import { render, screen } from '@testing-library/react';;
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ProductList } from './ProductList';

describe("ViewCart", () => {

    let init = (id, quantity, inventory) => {
        const mockStore = configureStore()
        const store = mockStore({
            cart: {
                items: []
            }
        });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductList products={[
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
                ]}/>
                </BrowserRouter>
            </Provider>);
    }


    it('renders the correct number of columns (cards)', () => {
        init();
        expect(screen.getAllByTestId("card-col")).toHaveLength(4);
    });

});