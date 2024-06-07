import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

// Redux setup
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import store, { persist } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </PersistGate>
  </Provider>
);
