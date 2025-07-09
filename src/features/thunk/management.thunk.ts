import { createAsyncThunk } from "@reduxjs/toolkit";
import type { NewAdminInput, CreatedAdmin } from "../../types/management";

export const addAdmin = createAsyncThunk<
  CreatedAdmin,
  NewAdminInput,
  { rejectValue: string }
>("admin/add", async (adminData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || "Failed to add admin");
    }

    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "An error occurred");
  }
});
