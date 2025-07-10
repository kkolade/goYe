import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
import authReducer from './slices/authSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for now
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export { store };
