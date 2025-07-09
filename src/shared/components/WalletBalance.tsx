import { useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import ProtectedRoute from "@/routes/protectedRoute";
import type { WalletBalanceProps } from "@/types/wallet";

function WalletBalance({ balance }: WalletBalanceProps) {
    const user = useSelector(selectUser);
    if (!user?.user) return null;

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#7DC242]">Wallet Balance</h3>
            <p className="text-2xl font-bold text-gray-800">
                ${balance?.toFixed(2)}
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
