import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addAdmin } from "../thunk/management.thunk";
import type { AdminState, CreatedAdmin } from "../../types/management";

const initialState: AdminState = {
  loading: false,
  error: null,
  newAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.newAdmin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.newAdmin = null;
      })
      .addCase(addAdmin.fulfilled, (state, action: PayloadAction<CreatedAdmin>) => {
        state.newAdmin = action.payload;
        state.loading = false;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.error = action.payload || "Failed to add admin";
        state.loading = false;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
