import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { resetAchievements } from './achievementSlice';
import { addToast } from './toastSlice';

const AUTH_TOKEN_KEY = 'auth_token';

const readTokenFromStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.warn('Unable to read auth token from storage', error);
    return null;
  }
};

const writeTokenToStorage = (token) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch (error) {
    console.warn('Unable to persist auth token', error);
  }
};

const persistedToken = readTokenFromStorage();

if (persistedToken) {
  authService.setAuthToken(persistedToken);
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.register(payload);
      authService.setAuthToken(data.token);
      writeTokenToStorage(data.token);
      dispatch(addToast({
        type: 'success',
        message: `Welcome aboard, ${data.user?.name ?? 'customer'}! Your account is ready.`,
      }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message
        || error.response?.data?.errors?.email?.[0]
        || error.message
        || 'Registration failed';
      dispatch(addToast({ type: 'error', message }));
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.login(payload);
      authService.setAuthToken(data.token);
      writeTokenToStorage(data.token);
      dispatch(addToast({
        type: 'success',
        message: `Welcome back, ${data.user?.name ?? 'customer'}!`,
      }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message
        || error.response?.data?.errors?.email?.[0]
        || error.message
        || 'Login failed';
      dispatch(addToast({ type: 'error', message }));
      return rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const user = await authService.me();
      const userName = user?.name || user?.email || 'customer';
      const hasToken = Boolean(getState().auth.token);
      if (hasToken) {
        dispatch(addToast({
          type: 'success',
          message: `Signed in as ${userName}.`,
        }));
      }
      return user;
    } catch (error) {
      authService.clearAuthToken();
      writeTokenToStorage(null);
      dispatch(resetAchievements());
      const message = error.response?.data?.message || 'Session expired. Please sign in again.';
      dispatch(addToast({ type: 'error', message }));
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await authService.logout();
      dispatch(addToast({ type: 'success', message: 'Signed out successfully.' }));
    } catch (error) {
      if (error.response?.status !== 401) {
        const message = error.response?.data?.message || 'Logout failed';
        dispatch(addToast({ type: 'error', message }));
        return rejectWithValue(message);
      }
      dispatch(addToast({ type: 'info', message: 'Session already ended.' }));
    } finally {
      authService.clearAuthToken();
      writeTokenToStorage(null);
      dispatch(resetAchievements());
    }

    return true;
  }
);

const initialState = {
  user: null,
  token: persistedToken,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = state.token ? 'loading' : 'idle';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
