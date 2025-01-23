'use client';

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    interface User {
        id?: number;
        name: string;
        email: string;
    }

    const [editUser, setEditUser] = useState<User | null>(null);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch("/api/users"); // Gọi API để lấy danh sách người dùng
        const data = await res.json();
        setUsers(data);
    };

    const handleAdd = () => {
        setEditUser(null); // Reset form
        setOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditUser(user);
        setOpen(true);
    };

    const handleDelete = async (id: any) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await fetch(`/api/users/${id}`, { method: "DELETE" }); // Xóa người dùng
            fetchUsers();
        }
    };

    const handleSave = async () => {
        if (editUser?.id) {
            // Cập nhật người dùng
            await fetch(`/api/users/${editUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
        } else {
            // Thêm người dùng mới
            await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
        }
        setOpen(false);
        fetchUsers();
    };

    return (
        <DefaultLayout>
            <div className="mx-auto w-full max-w-[1080px]">
                <Breadcrumb pageName="Settings" />

                <div style={{ padding: 20 }}>
                    <h1>User Management</h1>
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Add User
                    </Button>
                    <TableContainer component={Paper} style={{ marginTop: 20 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user: User) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleEdit(user)}
                                                style={{ marginRight: 10 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Dialog thêm/sửa người dùng */}
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>{editUser?.id ? "Edit User" : "Add User"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={editUser?.name || ""}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value, email: editUser?.email || "" })}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                fullWidth
                                value={editUser?.email || ""}
                                onChange={(e) =>
                                    setEditUser({ ...editUser, email: e.target.value, name: editUser?.name || "" })
                                }
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave} color="primary" variant="contained">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </DefaultLayout>
    );
}