import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/selectors/user.selector";
import { resetAdminState } from "@/features/slice/management.slice";
import { addAdmin } from "@/features/thunk/management.thunk";
import type { AppDispatch, RootState } from "@/store/store";
import logo from "@/assets/logo.svg";

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
        return <div className="form-main-wrapper"><div className="form-inner-wrapper"><div className="error-style animate-fade-in">You are not authorized to access this page</div></div></div>;
    }

    return (
        <div className="form-main-wrapper">
            <div className="form-inner-wrapper">
                <div className="login-form">
                    <img src={logo} alt="Logo" className="w-20 h-20 mb-3" />
                    <h2 className="login-welcome">Manage Admins</h2>
                    <p className="text-[#4B6B1A] text-base">Add a new admin user</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8 p-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Admin name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="field-style"
                        />
                    </div>
                    {newAdmin && (
                        <div className="success-style animate-fade-in">
                            New admin added: <strong>{newAdmin.name}</strong> (ID: {newAdmin.id})
                        </div>
                    )}
                    {error && <div className="error-style animate-fade-in">{error}</div>}
                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !name.trim() ||
                            !username.trim() ||
                            !password.trim()
                        }
                        className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md text-lg transition-all duration-200 ${loading ? "bg-[#A6E67B] cursor-not-allowed" : "not-submitting-btn-style"}`}
                    >
                        {loading ? "Adding..." : "Add Admin"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageUsers;
