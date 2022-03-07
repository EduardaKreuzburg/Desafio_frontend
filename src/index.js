import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { OrderContextProvider } from './common/providers/orderContext';

ReactDOM.render(
  <BrowserRouter>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();
