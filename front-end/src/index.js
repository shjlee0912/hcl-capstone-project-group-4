import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import CONFIG from './config/config';

const stripePromise = loadStripe(CONFIG.STRIPE_KEY);

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

