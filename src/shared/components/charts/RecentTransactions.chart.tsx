import { selectUser } from "@/features/selectors/user.selector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/shared/components/table";
import { PageHeader } from "@/shared/components/pageHeader";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ProtectedRoute from "@/routes/protectedRoute";

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

    // Group transactions by date and sum amounts
    const groupedData = transactions.reduce<Record<string, number>>((acc, tx) => {
        // Normalize date string to YYYY-MM-DD if needed
        const dateKey = tx.date?.slice(0, 10) ?? "Unknown";
        acc[dateKey] = (acc[dateKey] || 0) + Number(tx.amount);
        return acc;
    }, {});

    const chartOptions: ApexOptions = {
        chart: {
            type: "bar" as const,
            toolbar: { show: false },
        },
        colors: ["#7DC242"],
        xaxis: {
            categories: Object.keys(groupedData),
            labels: {
                rotate: -45,
                style: { fontSize: "12px" },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4,
                columnWidth: "45%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `$${val.toFixed(2)}`,
            },
        },
    };

    const chartSeries = [{
        name: "Transaction Amount",
        data: Object.values(groupedData),
    }];

    return (
        <div className="mt-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <PageHeader title="Recent Transactions" description="A list of your most recent transactions" />

            {transactions.length > 0 ? (
                <>
                    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction Amounts by Date</h2>
                        <Chart options={chartOptions} series={chartSeries} type="bar" height={320} />
                    </div>
                </>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            )}
        </div>
    );
}

export default function RecentTransactionsChart(props: any) {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <RecentTransactions {...props} />
        </ProtectedRoute>
    );
}
