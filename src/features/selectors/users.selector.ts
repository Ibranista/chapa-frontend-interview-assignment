import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export const selectUsers = createSelector(
    (state: RootState) => state.users,
    (users) => users
);