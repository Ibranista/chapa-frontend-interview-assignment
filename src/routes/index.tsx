import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Greetings from "../pages/Greetings"
import MainLayout from "@/shared/layout/MainLayout";
import Login from "@/pages/Login";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "@/features/selectors/user.selector";
import { useSelector } from "react-redux";
import UserList from "@/pages/Users";
import ProtectedRoute from "./protectedRoute";
import TransactionSummaryTable from "@/pages/Transaction";
import ManageUsers from "@/pages/ManageUsers";
import TransactionForm from "@/pages/Transaction.form";
import RecentTransactions from "@/pages/RecentTransactions";

function RequireAuth() {
  const userData = useSelector(selectUser);
  if (userData.loading) return <div>Loading...</div>;
  if (!userData.user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "greetings",
            element: <Greetings />,
          },
          {
            path: "users",
            element:
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <UserList />
              </ProtectedRoute>
            ,
          },
          {
            path: "transaction-summary",
            element:
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <TransactionSummaryTable />
              </ProtectedRoute>
            ,
          },
          {
            path: "manage-users",
            element:
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <ManageUsers />
              </ProtectedRoute>
            ,
          },
          {
            path: "initiate-transaction",
            element:
              <ProtectedRoute allowedRoles={["user"]}>
                <TransactionForm />
              </ProtectedRoute>
            ,
          },
          {
            path: "recent-transactions",
            element:
              <ProtectedRoute allowedRoles={["user"]}>
                <RecentTransactions />
              </ProtectedRoute>
            ,
          }
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
