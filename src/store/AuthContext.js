import {configureStore} from '@reduxjs/toolkit';
import authContext from './AuthToken';

export const AuthContext = configureStore({
  reducer: {
    authToken: authContext,
  },
});
