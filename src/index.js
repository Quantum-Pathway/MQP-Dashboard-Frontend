import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { initializeAuthentication } from './store/auth-sso-slice';

import './index.scss';

async function startApplication() {
  try {
    await store.dispatch(initializeAuthentication());
  } catch (error) {
    console.error("Authentication initialization failed.");
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

};
startApplication();

reportWebVitals();
