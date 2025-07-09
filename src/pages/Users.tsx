import { fetchUsers, toggleUserStatus } from "@/features/thunk/users.thunk";
import type { AppDispatch, RootState } from "@/store/store";
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

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, updatingId } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleToggle = (user: any) => {
        dispatch(toggleUserStatus(user));
    };

    if (loading) return <div className="mt-8 text-center text-gray-600">Loading users...</div>;
    if (error) return <div className="mt-8 text-center text-red-500">Error: {error}</div>;

    const header = ["Name", "Status", "Action"]

    return (
        <div className="mt-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <PageHeader title="User Management" description="View and manage all users" />

            {users.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No users found.</p>
                </div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <Table className="table-container-style">
                        <TableHeader>
                            <TableRow className="table-row">
                                {header.map((head) => (
                                    <TableHead className="table-head-style">{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50">
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-style">{user.name}</p>
                                    </TableCell>
                                    <TableCell className="table-cell-style">
                                        <p className="table-cell-text-style">{user.active ? "Active" : "Inactive"}</p>
                                    </TableCell>
                                    <TableCell className="table-cell-style">
                                        <button
                                            onClick={() => handleToggle(user)}
                                            disabled={updatingId === user.id}
                                            className={`px-4 py-1 rounded text-white ${user.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} disabled:opacity-60`}
                                        >
                                            {updatingId === user.id
                                                ? "Updating..."
                                                : user.active
                                                    ? "Deactivate"
                                                    : "Activate"}
                                        </button>
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

export default UserList;
