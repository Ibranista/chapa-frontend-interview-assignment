import type { User } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (err: any) {
    return rejectWithValue(err.message || "An error occurred");
  }
});

export const toggleUserStatus = createAsyncThunk<
  User,
  User,
  { rejectValue: { id: string; message: string } }
>("users/toggleStatus", async (user, { rejectWithValue }) => {
  try {
    const endpoint = `/api/users/${user.id}/${user.active ? "deactivate" : "activate"}`;
    const res = await fetch(endpoint, { method: "PATCH" });

    if (!res.ok) {
      throw new Error("Failed to update user status");
    }

    return { ...user, active: !user.active };
  } catch (err: any) {
    return rejectWithValue({ id: user.id, message: err.message || "An error occurred" });
  }
});
