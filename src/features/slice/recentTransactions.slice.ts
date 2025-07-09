
import type { BalanceResponse, Transaction } from "@/types/transaction";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchBalance, fetchTransactions } from "../thunk/recentTransactions.thunk";

interface DashboardState {
  balance: number | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  balance: null,
  transactions: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => {
      state.balance = null;
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<BalanceResponse>) => {
        state.balance = action.payload.balance;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch balance";
        state.loading = false;
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch transactions";
        state.loading = false;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
