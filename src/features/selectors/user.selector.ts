import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export const selectUser = createSelector(
    (state: RootState) => state.auth,
    (user) => user
);