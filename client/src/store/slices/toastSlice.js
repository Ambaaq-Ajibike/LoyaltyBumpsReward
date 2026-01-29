import { createSlice, nanoid } from '@reduxjs/toolkit';

const DEFAULT_DURATION = 5000;

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    items: [],
  },
  reducers: {
    addToast: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ message, type = 'info', duration = DEFAULT_DURATION }) {
        return {
          payload: {
            id: nanoid(),
            message,
            type,
            duration,
            createdAt: Date.now(),
          },
        };
      },
    },
    removeToast(state, action) {
      state.items = state.items.filter((toast) => toast.id !== action.payload);
    },
    clearToasts(state) {
      state.items = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
