import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { achievementService } from '../../services/achievementService';
import { addToast } from './toastSlice';

export const fetchAchievements = createAsyncThunk(
  'achievements/fetchAchievements',
  async ({ showSuccessToast = false } = {}, { getState, rejectWithValue, dispatch }) => {
    try {
      const userId = getState().auth.user?.id;

      if (!userId) {
        throw new Error('Please sign in to view your achievements');
      }

      const data = await achievementService.getUserAchievements(userId);
      if (showSuccessToast) {
        dispatch(addToast({ type: 'success', message: 'Loyalty progress refreshed.' }));
      }
      return {
        unlocked_achievements: data.unlocked_achievements ?? [],
        next_available_achievements: data.next_available_achievements ?? [],
        current_badge: data.current_badge ?? '',
        next_badge: data.next_badge ?? '',
        remaining_to_unlock_next_badge: data.remaining_to_unlock_next_badge ?? 0,
        total_points: data.total_points ?? 0,
        next_badge_points_required: data.next_badge_points_required ?? null,
        next_badge_cashback: data.next_badge_cashback ?? null,
      };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unable to fetch achievements';
      if (message) {
        dispatch(addToast({ type: 'error', message }));
      }
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: {
    unlocked_achievements: [],
    next_available_achievements: [],
    current_badge: '',
    next_badge: '',
    remaining_to_unlock_next_badge: 0,
    total_points: 0,
    next_badge_points_required: null,
    next_badge_cashback: null,
  },
  loading: false,
  error: null,
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    resetAchievements: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAchievements } = achievementSlice.actions;
export default achievementSlice.reducer;
