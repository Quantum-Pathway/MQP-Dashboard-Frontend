import { configureStore } from '@reduxjs/toolkit';
import authSSOReducer from "./auth-sso-slice";
import accessibilitiesReducer from './accessibilities-slice';


const store = configureStore({
  reducer: {
    authentication: authSSOReducer,
    accessibilities: accessibilitiesReducer,
  },
});

export default store;
