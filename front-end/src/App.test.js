import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe("Application", () => {

  beforeAll( () => {
      render(<Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>);
  });

  it('renders without crashing', () => {
  
  });


});