import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export const selectRecentTransactions = createSelector(
    (state: RootState) => state.recentTransactions,
    (recentTransactions) => recentTransactions
);