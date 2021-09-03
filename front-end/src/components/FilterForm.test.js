import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FilterForm } from './FilterForm';

describe("Filter Form", () => {

    let store;

    beforeEach( () => {
        const mockStore = configureStore();
        store = mockStore({ 
            catalog: {
                loaded: true,
                error: false,
                products: [],
                filter: {
                    categories: ['categoryA'],
                    name: "prodName",
                    minPrice: 1.1,
                    maxPrice: 1.5
                },
                sort: "AZ",
                categories: ["categoryA", "catB"],
                page: 1
            }
        });
        render(<Provider store={store}>
            <BrowserRouter>
                <FilterForm/>
            </BrowserRouter>
        </Provider>)
    });


    it("displays category in select", () => {
        expect(screen.getAllByTestId("catB")).toHaveLength(1);
    });

    it("displays selected category in pill", () => {
        expect(screen.getAllByText("categoryA")).toHaveLength(1);
    });

    it("displays current filter name value", () => {
        let name = screen.getByTestId("name");
        expect(name.value).toEqual("prodName");
        userEvent.type(name, "typedName");
        let actions = store.getActions();
        expect(actions).toHaveLength(9);
        expect(actions[0].type).toEqual("catalog/filter");
        expect(actions[8].payload).toEqual({
            categories: ['categoryA'],
            name: "typedName",
            minPrice: 1.1,
            maxPrice: 1.5
        });
        store.clearActions();
    });

    it("displays current filter minimum price value and dispatches action on change", () => {
        let minPrice = screen.getByTestId("min-price");
        expect(minPrice.value).toEqual("1.1");
        userEvent.type(minPrice, "3");
        let actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0].type).toEqual("catalog/filter");
        expect(actions[0].payload).toEqual({
            categories: ['categoryA'],
            name: "prodName",
            minPrice: 3,
            maxPrice: 1.5
        });
        store.clearActions();
    });

    it("displays current filter maximum price value and dispatches action on change", () => {
        let maxPrice = screen.getByTestId("max-price");
        expect(maxPrice.value).toEqual("1.5");
        userEvent.type(maxPrice, "3");
        let actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0].type).toEqual("catalog/filter");
        expect(actions[0].payload).toEqual({
            categories: ['categoryA'],
            name: "prodName",
            minPrice: 1.1,
            maxPrice: 3
        });
        store.clearActions();
    });

    it("displays current sort value", () => {
        expect(screen.getByTestId("sort").value).toEqual("AZ");
    });

    it("displays clear button and dispatches action on click", () => {
        let clearBtn = screen.getByText(/clear/i);
        expect(clearBtn).toBeDefined();
        userEvent.click(clearBtn);
        let actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0].type).toEqual("catalog/resetFilterAndSort");
        store.clearActions();
    });

});