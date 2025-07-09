import { useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import ProtectedRoute from "@/routes/protectedRoute";
import type { WalletBalanceProps } from "@/types/wallet";

function WalletBalance({ balance }: WalletBalanceProps) {
    const user = useSelector(selectUser);
    if (!user?.user) return null;

    return (
        <div style={{ marginTop: "1rem" }}>
            <h3>Wallet Balance</h3>
            <p>
                <strong>${balance?.toFixed(2)}</strong>
            </p>
        </div>
    );
}

export default function WalletBalanceWithProtection(props: WalletBalanceProps) {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <WalletBalance {...props} />
        </ProtectedRoute>
    );
}
