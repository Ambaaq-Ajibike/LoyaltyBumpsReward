import { configureStore } from '@reduxjs/toolkit';
import achievementReducer from './slices/achievementSlice';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import purchaseReducer from './slices/purchaseSlice';

const store = configureStore({
  reducer: {
    achievements: achievementReducer,
    auth: authReducer,
    toast: toastReducer,
    purchases: purchaseReducer,
  },
});

export default store;
