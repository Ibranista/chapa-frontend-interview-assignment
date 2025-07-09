import { selectUser } from "@/features/selectors/user.selector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/shared/components/table";
import { PageHeader } from "@/shared/components/pageHeader";

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
        <div className="mt-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <PageHeader title="Recent Transactions" description="A list of your most recent transactions" />
            {transactions.length > 0 ? (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>${tx.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            )}
        </div>
    )
}

export default RecentTransactions;