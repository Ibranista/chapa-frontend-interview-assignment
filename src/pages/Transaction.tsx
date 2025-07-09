import { selectTransactionSummary } from "@/features/selectors/transaction.selector";
import { fetchTransactionSummary } from "@/features/thunk/transaction.thunk";
import type { AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/shared/components/table";
import { PageHeader } from "@/shared/components/pageHeader";

// this is a table to display the transaction summary
const TransactionSummaryTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { summaries, loading, error } = useSelector(selectTransactionSummary);

    useEffect(() => {
        dispatch(fetchTransactionSummary());
    }, [dispatch]);

    if (loading) return <div className="mt-8 text-center text-gray-600">Loading payment summary...</div>;
    if (error) return <div className="mt-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="mt-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <PageHeader title="User Payment Summary" description="Overview of all user transactions" />

            {summaries.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <Table className="table-container-style">
                        <TableHeader>
                            <TableRow className="table-row">
                                <TableHead className="table-head-style">
                                    Name
                                </TableHead>
                                <TableHead className="table-head-style">
                                    User ID
                                </TableHead>
                                <TableHead className="table-head-style">
                                    Total Payments
                                </TableHead>
                                <TableHead className="table-head-style">
                                    Last Payment Date
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white divide-y divide-gray-200">
                            {summaries.map((summary) => (
                                <TableRow key={summary.userId} className="hover:bg-gray-50">
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-style">{summary.userName}</p>
                                    </TableCell>
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-date-style">{summary.userId}</p>
                                    </TableCell>
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-style font-semibold">
                                            ${summary.totalPayments.toFixed(2)}
                                        </p>
                                    </TableCell>
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-date-style">{summary.lastPaymentDate}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default TransactionSummaryTable;