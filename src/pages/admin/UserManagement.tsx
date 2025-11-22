import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Shield, Trash2, Ban, CheckCircle } from 'lucide-react';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Candidate', status: 'Active', joinDate: '2025-11-01' },
        { id: 2, name: 'TechCorp Inc.', email: 'hr@techcorp.com', role: 'Employer', status: 'Active', joinDate: '2025-10-15' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Candidate', status: 'Suspended', joinDate: '2025-11-05' },
        { id: 4, name: 'StartupHub', email: 'admin@startuphub.io', role: 'Employer', status: 'Active', joinDate: '2025-11-10' },
        { id: 5, name: 'Admin User', email: 'admin@portal.com', role: 'Admin', status: 'Active', joinDate: '2025-01-01' },
    ]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleStatusChange = (id: number) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
        ));
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">User Management</h1>
                    <p className="text-gray-400">Manage user access, roles, and account status.</p>
                </div>
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple font-bold shadow-neon-cyan hover:shadow-neon-purple transition-all">
                    + Add User
                </button>
            </motion.div>

            {/* Search & Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl glass border border-white/10 flex flex-col md:flex-row gap-4"
            >
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                </div>
                <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-neon-cyan text-white">
                    <option value="">All Roles</option>
                    <option value="Candidate">Candidate</option>
                    <option value="Employer">Employer</option>
                    <option value="Admin">Admin</option>
                </select>
                <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Filter size={20} />
                    Filters
                </button>
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl glass border border-white/10 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="p-6 font-medium">User</th>
                                <th className="p-6 font-medium">Role</th>
                                <th className="p-6 font-medium">Status</th>
                                <th className="p-6 font-medium">Joined</th>
                                <th className="p-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs border ${user.role === 'Admin' ? 'border-neon-pink/30 text-neon-pink bg-neon-pink/10' :
                                                user.role === 'Employer' ? 'border-neon-purple/30 text-neon-purple bg-neon-purple/10' :
                                                    'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-2 text-sm ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {user.status === 'Active' ? <CheckCircle size={14} /> : <Ban size={14} />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-400 text-sm">{user.joinDate}</td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleStatusChange(user.id)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-colors"
                                                title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default UserManagement;
