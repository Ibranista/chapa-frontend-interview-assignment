import { Outlet } from "react-router-dom";
import { Sidebar } from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import { logout } from "@/features/thunk/auth.thunk";
import WalletBalance from "@/components/WalletBalance";
import { useEffect } from "react";
import { selectRecentTransactions } from "@/features/selectors/recentTransactions.selector";
import { fetchBalance } from "@/features/thunk/recentTransactions.thunk";
import type { AppDispatch } from "@/store/store";

// gets displayed on all pages
export default function MainLayout() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const { balance, error } = useSelector(selectRecentTransactions);

    useEffect(() => {
        if (user?.user?.id) {
            dispatch(fetchBalance(user.user.id));
        }
    }, [dispatch, user?.user?.id]);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ display: "flex", flex: 1 }}>
                {error && <div className="error-msg">{error}</div>}
                {user && (
                    <button style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }} onClick={() => dispatch(logout() as any)}>
                        Logout
                    </button>
                )}
                <Sidebar />
                <div style={{ flex: 1, marginLeft: 0, transition: "margin 0.2s" }}>
                    {user?.user && <WalletBalance balance={balance} />}
                    <Outlet />
                </div>
            </div>
        </div>
    );
} 