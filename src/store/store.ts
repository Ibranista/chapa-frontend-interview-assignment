import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/slice/auth.slice";
import usersReducer from "@/features/slice/users.slice";
import transactionSummaryReducer from "@/features/slice/transaction.slice";
import adminReducer from "@/features/slice/management.slice";
import recentTransactionsReducer from "@/features/slice/recentTransactions.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  transactionSummary: transactionSummaryReducer,
  admin: adminReducer,
  recentTransactions: recentTransactionsReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
