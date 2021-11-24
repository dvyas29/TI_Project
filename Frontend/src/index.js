import React from 'react';
import { CartProvider } from "react-use-cart";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./reducer/store"
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <CartProvider>
      <App />
      </CartProvider>
    </Provider>
  </React.StrictMode> ,
  document.getElementById('root')
);


