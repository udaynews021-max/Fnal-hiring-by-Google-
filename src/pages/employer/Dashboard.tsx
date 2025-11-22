import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, TrendingUp, MoreVertical } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const EmployerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const stats = [
        { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-neon-cyan' },
        { label: 'Total Candidates', value: '1,234', icon: Users, color: 'text-neon-purple' },
        { label: 'Interviews Scheduled', value: '45', icon: Calendar, color: 'text-neon-pink' },
        { label: 'Hiring Rate', value: '+15%', icon: TrendingUp, color: 'text-green-400' },
    ];

    const recentApplicants = [
        { name: 'Sarah Johnson', role: 'Senior Frontend Developer', score: 95, status: 'Shortlisted', date: '2h ago' },
        { name: 'Michael Chen', role: 'UX/UI Designer', score: 88, status: 'Reviewing', date: '4h ago' },
        { name: 'Emily Davis', role: 'Product Manager', score: 92, status: 'Interview', date: '5h ago' },
        { name: 'David Wilson', role: 'DevOps Engineer', score: 78, status: 'New', date: '1d ago' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, TechCorp Inc. Here's what's happening today.</p>
                </div>
                <button
                    onClick={() => navigate('/employer/post-job')}
                    className="btn-3d btn-primary"
                >
                    + Post New Job
                </button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-xl glass hover:border-neon-cyan/50 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-2xl font-bold">{stat.value}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Applicants Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl glass border border-white/10 overflow-hidden"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Recent Applicants</h3>
                    <button
                        onClick={() => navigate('/employer/candidates')}
                        className="btn-3d btn-ghost px-3 py-1"
                    >
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="p-6 font-medium">Candidate</th>
                                <th className="p-6 font-medium">Role Applied</th>
                                <th className="p-6 font-medium">AI Score</th>
                                <th className="p-6 font-medium">Status</th>
                                <th className="p-6 font-medium">Date</th>
                                <th className="p-6 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentApplicants.map((applicant, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-medium">{applicant.name}</td>
                                    <td className="p-6 text-gray-300">{applicant.role}</td>
                                    <td className="p-6">
                                        <span className={`font-bold ${applicant.score >= 90 ? 'text-green-400' :
                                            applicant.score >= 80 ? 'text-neon-cyan' :
                                                'text-yellow-400'
                                            }`}>
                                            {applicant.score}%
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs border ${applicant.status === 'Shortlisted' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                            applicant.status === 'Interview' ? 'border-neon-purple/30 text-neon-purple bg-neon-purple/10' :
                                                applicant.status === 'Reviewing' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                                    'border-gray-500/30 text-gray-400 bg-gray-500/10'
                                            }`}>
                                            {applicant.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-400 text-sm">{applicant.date}</td>
                                    <td className="p-6 text-right">
                                        <button className="btn-3d btn-icon btn-ghost p-1.5">
                                            <MoreVertical size={14} className="text-gray-400" />
                                        </button>
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

export default EmployerDashboard;
