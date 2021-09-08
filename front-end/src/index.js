import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

const stripePromise = loadStripe("pk_test_51JWj0pIEb7HWAVreamX2kRQvYtCcTNqh4nKSIpruKIYMN8ZIxX8WZ4fNcbtTyS8oDG4Jf0LKQw4jRDQAizpIAI4300ONv9IY9p");

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

