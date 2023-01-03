import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const authContext = createSlice({
  name: 'AuthToken',
  initialState: {
    token: null,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      AsyncStorage.setItem('token', action.payload.token);
    },
    logOut: (state, action) => {
      state.token = null;
      AsyncStorage.removeItem('token');
    },
  },
});

export const authenticate = authContext.actions.authenticate;
export const logOut = authContext.actions.logOut;

export default authContext.reducer;
