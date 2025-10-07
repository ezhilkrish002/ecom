import { createSlice } from '@reduxjs/toolkit';

// Initialize users from sessionStorage or empty array
const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '', // Note: In a real app, never store password in state; this is for demo purposes
  isLoading: false,
  error: null,
  users: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('users') || '[]') : [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      // In a real app, you'd typically store a token or user data here
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      // Do not set email, firstName, lastName, or password to avoid implying login
      // Store user data in users array and save to sessionStorage
      const newUser = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
      };
      state.users.push(newUser);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    signOut: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.password = '';
      state.isLoading = false;
      state.error = null;
      // Note: users array and sessionStorage are not cleared to allow login after sign-out
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure, clearError, signOut } = authSlice.actions;
export default authSlice.reducer;