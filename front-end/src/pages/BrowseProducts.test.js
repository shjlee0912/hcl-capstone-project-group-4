import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowseProducts } from './BrowseProducts';
import store from '../redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { server } from '../mocks/server';


describe("Browse Products page", () => {

  beforeAll( () => {
        server.listen();
      render(<Provider store={store}>
        <BrowserRouter>
          <BrowseProducts/>
        </BrowserRouter>
      </Provider>);
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders without crashing', () => {
  
  });


});