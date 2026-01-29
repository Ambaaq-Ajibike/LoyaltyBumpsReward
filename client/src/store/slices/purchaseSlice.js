import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { purchaseService } from '../../services/purchaseService';
import { addToast } from './toastSlice';
import { fetchAchievements } from './achievementSlice';

export const fetchPurchases = createAsyncThunk(
  'purchases/fetchPurchases',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.id;

      if (!userId) {
        throw new Error('Please sign in to view purchases');
      }

      const data = await purchaseService.listByUser(userId);
      return {
        items: data.purchases ?? [],
        totalSpent: data.total_spent ?? 0,
        purchaseCount: data.purchase_count ?? 0,
      };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unable to load purchases';
      return rejectWithValue(message);
    }
  }
);

export const createPurchase = createAsyncThunk(
  'purchases/createPurchase',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const data = await purchaseService.create(payload);
      const itemName = payload?.metadata?.name || 'Purchase';
      dispatch(addToast({ type: 'success', message: `${itemName} purchase confirmed.` }));
      dispatch(fetchPurchases());
      dispatch(fetchAchievements());
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unable to complete purchase';
      dispatch(addToast({ type: 'error', message }));
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  totalSpent: 0,
  purchaseCount: 0,
  loading: false,
  creating: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalSpent = action.payload.totalSpent;
        state.purchaseCount = action.payload.purchaseCount;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPurchase.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.creating = false;
        state.items = [action.payload, ...state.items];
        state.purchaseCount += 1;
        state.totalSpent = Number(state.totalSpent) + Number(action.payload.amount || 0);
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      });
  },
});

export default purchaseSlice.reducer;
