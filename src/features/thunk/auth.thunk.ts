import type { User } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error || 'Login failed');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    return rejectWithValue('Network error');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await fetch('/api/logout', { method: 'POST' });
  localStorage.removeItem('user');
});