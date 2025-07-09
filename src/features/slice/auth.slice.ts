import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from '../thunk/auth.thunk';
import type { User } from "../../types/user";
import type { AuthState } from "../../types/auth";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
        state.loading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
