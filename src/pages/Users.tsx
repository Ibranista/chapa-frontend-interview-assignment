import { fetchUsers, toggleUserStatus } from "@/features/thunk/users.thunk";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, updatingId } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleToggle = (user: any) => {
        dispatch(toggleUserStatus(user));
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    console.log("users")
    return (
        <div>
            <h3>Users</h3>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table border={1} cellPadding={8} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.active ? "Active" : "Inactive"}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggle(user)}
                                        disabled={updatingId === user.id}
                                    >
                                        {updatingId === user.id
                                            ? "Updating..."
                                            : user.active
                                                ? "Deactivate"
                                                : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
