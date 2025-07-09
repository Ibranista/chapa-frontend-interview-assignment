import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import { resetAdminState } from "@/features/slice/management.slice";
import { addAdmin } from "@/features/thunk/management.thunk";
import type { AppDispatch, RootState } from "@/store/store";

const ManageUsers: React.FC = () => {
    const user = useSelector(selectUser);
    const isSuperAdmin = user?.user?.role === "superadmin";

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, newAdmin } = useSelector((state: RootState) => state.admin);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(resetAdminState());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(addAdmin({ name, username, password })).then((res) => {
            if (res.type === "admin/add/fulfilled") {
                setName("");
                setUsername("");
                setPassword("");
            }
        });
    };

    if (!isSuperAdmin) {
        return <div>You are not authorized to access this page</div>;
    }

    return (
        <div>
            <h3>Add New Admin</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Admin name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={
                        loading ||
                        !name.trim() ||
                        !username.trim() ||
                        !password.trim()
                    }
                >
                    {loading ? "Adding..." : "Add Admin"}
                </button>
            </form>

            {newAdmin && (
                <p>
                    New admin added: <strong>{newAdmin.name}</strong> (ID: {newAdmin.id})
                </p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ManageUsers;
