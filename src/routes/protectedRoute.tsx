import { selectUser } from "@/features/selectors/user.selector";
import type { User } from "@/types/user";
import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps extends PropsWithChildren {
    allowedRoles?: User["role"][];
}

export default function ProtectedRoute({
    allowedRoles,
    children,
}: ProtectedRouteProps) {
    const user = useSelector(selectUser);
    const location = useLocation();

    const loading = user === undefined;
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // to prevent site attack tell as if this kind of rout does not exist.
    if (allowedRoles && !allowedRoles.includes(user.user?.role as User["role"])) {
        return <h1>Page Not Found!</h1>
    }

    return <>{children}</>;
}
