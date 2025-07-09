// store/slices/paymentSummarySlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactionSummary } from "../thunk/transaction.thunk";
import type { PaymentSummary, PaymentSummaryState } from "../../types/transaction";

const initialState: PaymentSummaryState = {
  summaries: [],
  loading: false,
  error: null,
};

const transactionSummarySlice = createSlice({
  name: "transactionSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactionSummary.fulfilled,
        (state, action: PayloadAction<PaymentSummary[]>) => {
          state.summaries = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTransactionSummary.rejected, (state, action) => {
        state.error = action.payload || "Failed to load summaries";
        state.loading = false;
      });
  },
});

export default transactionSummarySlice.reducer;
