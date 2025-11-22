import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Server, Activity, Cpu } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '5,432', icon: Users, color: 'text-neon-cyan' },
        { label: 'Active Jobs', value: '890', icon: Briefcase, color: 'text-neon-purple' },
        { label: 'API Requests', value: '1.2M', icon: Server, color: 'text-neon-pink' },
        { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-green-400' },
    ];

    const aiServices = [
        { name: 'Gemini Pro', status: 'Active', latency: '120ms', usage: '45%' },
        { name: 'OpenAI GPT-4', status: 'Active', latency: '250ms', usage: '30%' },
        { name: 'Claude 3', status: 'Standby', latency: '-', usage: '0%' },
        { name: 'DeepSeek', status: 'Active', latency: '180ms', usage: '25%' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">System Overview</h1>
                    <p className="text-gray-400">Monitor platform performance and AI service status.</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-xl glass hover:border-neon-pink/50 transition-colors"
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

            {/* AI Service Status */}
            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-xl glass border border-white/10"
                >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Cpu className="text-neon-pink" size={24} />
                        AI Service Status
                    </h3>
                    <div className="space-y-4">
                        {aiServices.map((service, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${service.status === 'Active' ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-yellow-400'
                                        }`} />
                                    <span className="font-medium">{service.name}</span>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                    <span className="text-gray-400">Latency: {service.latency}</span>
                                    <span className="text-gray-400">Load: {service.usage}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-xl glass border border-white/10"
                >
                    <h3 className="text-xl font-bold mb-6">Recent System Logs</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/5 text-sm font-mono">
                                <span className="text-gray-500">[2025-11-19 21:45:0{i}]</span>
                                <span className="text-neon-cyan mx-2">INFO</span>
                                <span className="text-gray-300">Processed video assessment for candidate #123{i}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
