import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export const selectTransactionSummary = createSelector(
    (state: RootState) => state.transactionSummary,
    (transactionSummary) => transactionSummary
);