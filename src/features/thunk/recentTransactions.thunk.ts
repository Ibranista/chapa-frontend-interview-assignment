import type { BalanceResponse, Transaction } from "@/types/transaction";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBalance = createAsyncThunk<
  BalanceResponse,
  string,
  { rejectValue: string }
>("dashboard/fetchBalance", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/wallet", {
      headers: { "x-user-id": userId },
    });
    if (!res.ok) throw new Error("Failed to fetch balance");
    return await res.json();
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch balance");
  }
});

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>("dashboard/fetchTransactions", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/transactions", {
      headers: { "x-user-id": userId },
    });
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch transactions");
  }
});
