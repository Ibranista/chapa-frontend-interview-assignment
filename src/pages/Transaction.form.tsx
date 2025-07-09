import { selectUser } from "@/features/selectors/user.selector";
import { useState } from "react";
import { useSelector } from "react-redux";

function TransactionForm() {
    const user = useSelector(selectUser);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = async () => {
        try {
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
        <section className="">
            <section className="form-inner-wrapper">
                <article className="login-form">
                    <h2 className="login-welcome">Initiate Transaction</h2>
                    <p className="text-[#4B6B1A] text-base">Use negative amount to spend from wallet</p>
                </article>

                <form onSubmit={handleSubmit} className="space-y-8 p-3">
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            placeholder="Amount (e.g. -100)"
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>

                    {successMessage && (
                        <div className="success-style animate-fade-in">{successMessage}</div>
                    )}
                    {error && <div className="error-style animate-fade-in">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading || !amount || !description.trim() || !date}
                        className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md text-lg transition-all duration-200 ${loading ? "bg-[#A6E67B] cursor-not-allowed" : "not-submitting-btn-style"}`}
                    >
                        {loading ? "Processing..." : "Submit Transaction"}
                    </button>
                </form>
            </section>
        </section>
    );
}

export default TransactionForm;
