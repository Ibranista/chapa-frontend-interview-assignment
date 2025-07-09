import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, toggleUserStatus } from "../thunk/users.thunk";
import type { User, UserState } from "../../types/user";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    updatingId: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload || "Failed to load users";
                state.loading = false;
            })

            // Toggle User Status
            .addCase(toggleUserStatus.pending, (state, action) => {
                state.updatingId = action.meta.arg.id;
                state.error = null;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
                state.users = state.users.map((u) =>
                    u.id === action.payload.id ? action.payload : u
                );
                state.updatingId = null;
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.error = action.payload?.message || "Failed to update user";
                state.updatingId = null;
            });
    },
});

export default userSlice.reducer;
