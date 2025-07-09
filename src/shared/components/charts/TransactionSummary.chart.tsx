import { selectTransactionSummary } from "@/features/selectors/transaction.selector";
import { fetchTransactionSummary } from "@/features/thunk/transaction.thunk";
import type { AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageHeader } from "@/shared/components/pageHeader";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ProtectedRoute from "@/routes/protectedRoute";

const TransactionSummaryTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { summaries, loading, error } = useSelector(selectTransactionSummary);

    useEffect(() => {
        dispatch(fetchTransactionSummary());
    }, [dispatch]);

    if (loading) return <div className="mt-8 text-center text-gray-600">Loading payment summary...</div>;
    if (error) return <div className="mt-8 text-center text-red-500">Error: {error}</div>;

    const chartOptions: ApexOptions = {
        chart: {
            type: "bar" as const,
            toolbar: { show: false },
        },
        colors: ["#7DC242"],
        xaxis: {
            categories: summaries.map(s => s.userName),
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
        name: "Total Payments",
        data: summaries.map(s => s.totalPayments),
    }];

    return (
        <div className="mt-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <PageHeader title="User Payment Summary" description="Overview of all user transactions" />

            {summaries.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            ) : (
                <>
                    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Payments per User</h2>
                        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
                    </div>
                </>
            )}
        </div>
    );
};

export default function TransactionSummaryChart(props: any) {
    return (
        <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
            <TransactionSummaryTable {...props} />
        </ProtectedRoute>
    );
}
