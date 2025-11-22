import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Video, MoreVertical, Plus } from 'lucide-react';

interface Interview {
    id: number;
    candidateName: string;
    role: string;
    date: string;
    time: string;
    type: 'Video' | 'Technical' | 'HR';
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    avatar: string;
}

const MOCK_INTERVIEWS: Interview[] = [
    {
        id: 1,
        candidateName: "Sarah Johnson",
        role: "Senior Frontend Developer",
        date: "2024-03-20",
        time: "10:00 AM",
        type: "Video",
        status: "Scheduled",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        candidateName: "Michael Chen",
        role: "Full Stack Engineer",
        date: "2024-03-21",
        time: "2:00 PM",
        type: "Technical",
        status: "Scheduled",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        candidateName: "Emily Davis",
        role: "UI/UX Designer",
        date: "2024-03-18",
        time: "11:30 AM",
        type: "HR",
        status: "Completed",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
];

const Interviews: React.FC = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Interviews</h1>
                    <p className="text-gray-400">Manage your upcoming interview schedule.</p>
                </div>
                <button
                    onClick={() => alert("Schedule Interview modal would open here.")}
                    className="btn-3d btn-primary flex items-center gap-1.5"
                >
                    <Plus size={14} />
                    Schedule Interview
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Interviews List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                    {MOCK_INTERVIEWS.map((interview, index) => (
                        <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl glass border border-white/10 flex items-center gap-4 hover:border-neon-cyan/50 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex flex-col items-center justify-center border border-white/10">
                                    <span className="text-xs text-gray-400">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-lg font-bold text-neon-cyan">{new Date(interview.date).getDate()}</span>
                                </div>
                            </div>

                            <img
                                src={interview.avatar}
                                alt={interview.candidateName}
                                className="w-12 h-12 rounded-full object-cover border border-white/10"
                            />

                            <div className="flex-1">
                                <h3 className="font-bold">{interview.candidateName}</h3>
                                <p className="text-sm text-gray-400">{interview.role}</p>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {interview.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video size={16} />
                                    {interview.type}
                                </div>
                            </div>

                            <button className="btn-3d btn-icon btn-ghost p-1.5">
                                <MoreVertical size={14} className="text-gray-400" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Stats or Calendar Widget */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl glass border border-white/10 space-y-4">
                        <h3 className="font-semibold">Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total Interviews</span>
                                <span className="font-bold text-xl">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Pending Feedback</span>
                                <span className="font-bold text-xl text-yellow-500">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Completed</span>
                                <span className="font-bold text-xl text-green-500">45</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl glass border border-white/10 bg-gradient-to-br from-neon-purple/20 to-transparent">
                        <h3 className="font-semibold mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Our AI can help you schedule interviews automatically based on candidate availability.
                        </p>
                        <button className="btn-3d btn-ghost w-full">
                            Enable Auto-Scheduling
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interviews;
