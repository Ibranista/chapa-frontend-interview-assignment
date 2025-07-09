import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PaymentSummary } from "../../types/transaction";

export const fetchTransactionSummary = createAsyncThunk<
  PaymentSummary[],
  void,
  { rejectValue: string }
>("payments/fetchSummary", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/superadmin/payments-summary");
    if (!res.ok) throw new Error("Failed to fetch payment summary");
    return await res.json();
  } catch (err: any) {
    return rejectWithValue(err.message || "An error occurred");
  }
});
