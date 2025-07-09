import { selectTransactionSummary } from "@/features/selectors/transaction.selector";
import { fetchTransactionSummary } from "@/features/thunk/transaction.thunk";
import type { AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// this is a table to display the transaction summary
const TransactionSummaryTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { summaries, loading, error } = useSelector(selectTransactionSummary);

    useEffect(() => {
        dispatch(fetchTransactionSummary());
    }, [dispatch]);

    if (loading) return <p>Loading payment summary...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h3>User Payment Summary</h3>
            {summaries.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table
                    border={1}
                    cellPadding={8}
                    cellSpacing={0}
                    style={{ borderCollapse: "collapse" }}
                >
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User ID</th>
                            <th>Total Payments</th>
                            <th>Last Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaries.map((summary) => (
                            <tr key={summary.userId}>
                                <td>{summary.userName}</td>
                                <td>{summary.userId}</td>
                                <td>${summary.totalPayments.toFixed(2)}</td>
                                <td>{summary.lastPaymentDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionSummaryTable;
