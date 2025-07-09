import { selectUser } from "@/features/selectors/user.selector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecentTransactions() {
    const userData = useSelector(selectUser);
    const { user } = userData ?? {};

    const [transactions, setTransactions] = useState<any[]>([]);

    const fetchDashboardData = async () => {
        try {
            if (!user) return;

            const [balanceRes, txRes] = await Promise.all([
                fetch("/api/wallet", { headers: { "x-user-id": user.id } }),
                fetch("/api/transactions", { headers: { "x-user-id": user.id } }),
            ]);

            if (!balanceRes.ok || !txRes.ok) {
                throw new Error("Failed to load dashboard data");
            }

            const transactionsData = await txRes.json();

            setTransactions(transactionsData);
        } catch (err) {
            console.error("Data fetch error:", err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    return (
        <>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map((tx) => (
                        <li key={tx.id}>
                            {tx.date} - {tx.description}: ${tx.amount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions</p>
            )}
        </>
    )
}

export default RecentTransactions;