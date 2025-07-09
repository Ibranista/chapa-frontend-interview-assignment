import { Outlet } from "react-router-dom";
import { Sidebar } from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import WalletBalance from "@/shared/components/WalletBalance";
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
        if (user?.user?.id && user?.user?.role === "user") {
            dispatch(fetchBalance(user.user.id));
        }
    }, [dispatch, user?.user?.id, user?.user?.role]);

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {error && <div className="error-msg">{error}</div>}
            <Sidebar />
            <div style={{ flex: 1 }}>
                <header className="p-6 pt-6 pb-4 font-bold text-xl border-b border-gray-200 tracking-wide bg-[#7DC242] text-white sticky top-0 z-10"
                >
                    chapa frontend developer test assignment dashboard
                </header>
                {user?.user && <WalletBalance balance={balance} />}
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
} 