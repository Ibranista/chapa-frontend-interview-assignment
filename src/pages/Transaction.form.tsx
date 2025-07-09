import { selectUser } from "@/features/selectors/user.selector";
import { useState } from "react";
import { useSelector } from "react-redux";

// this is a form to initiate a transaction connected with the wallet balance
function TransactionForm() {
    const fetchDashboardData = async () => {
        try {
            // Only fetch if user is logged in
            if (!user) return;

            const [balanceRes, txRes] = await Promise.all([
                fetch("/api/wallet", { headers: { "x-user-id": user.user?.id || "" } }),
                fetch("/api/transactions", { headers: { "x-user-id": user.user?.id || "" } }),
            ]);

            if (!balanceRes.ok || !txRes.ok) {
                throw new Error("Failed to load dashboard data");
            }


        } catch (err) {
            console.error("Data fetch error:", err);
            setError("Failed to load dashboard data");
        }
    };

    const user = useSelector(selectUser);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": user.user?.id || "",
                },
                body: JSON.stringify({ amount, description, date }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Transaction failed.");
            }

            setSuccessMessage("Transaction successful.");
            setAmount(0);
            setDescription("");
            setDate(new Date().toISOString().split("T")[0]);
            fetchDashboardData();

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>Initiate Transaction</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Amount (use negative to spend)"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Submit Transaction"}
                </button>
            </form>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default TransactionForm;
