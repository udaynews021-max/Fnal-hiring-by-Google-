import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, Star, Download, MessageSquare, Eye, Plus } from 'lucide-react';

interface Candidate {
    id: number;
    name: string;
    role: string;
    location: string;
    experience: string;
    skills: string[];
    rating: number;
    status: 'New' | 'Shortlisted' | 'Interviewed' | 'Rejected';
    avatar: string;
}

const MOCK_CANDIDATES: Candidate[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Frontend Developer",
        location: "New York, NY",
        experience: "5 years",
        skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
        rating: 4.8,
        status: 'New',
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Full Stack Engineer",
        location: "San Francisco, CA",
        experience: "3 years",
        skills: ["Python", "Django", "React", "AWS"],
        rating: 4.5,
        status: 'Shortlisted',
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "UI/UX Designer",
        location: "Remote",
        experience: "4 years",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        rating: 4.9,
        status: 'Interviewed',
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Backend Developer",
        location: "Austin, TX",
        experience: "6 years",
        skills: ["Java", "Spring Boot", "Microservices", "Docker"],
        rating: 4.2,
        status: 'New',
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    }
];

const Candidates: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredCandidates = MOCK_CANDIDATES.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || candidate.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Candidates</h1>
                    <p className="text-gray-400">Manage and track your candidate pipeline.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-3d btn-secondary flex items-center gap-1.5">
                        <Download size={14} />
                        Export
                    </button>
                    <button className="btn-3d btn-primary flex items-center gap-1.5">
                        <Plus size={14} />
                        Add Candidate
                    </button>
                </div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col md:flex-row gap-4"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-3 text-gray-500" size={18} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors appearance-none text-white"
                    >
                        <option value="All">All Status</option>
                        <option value="New">New</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </motion.div>

            {/* Candidates List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredCandidates.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="p-6 rounded-xl glass border border-white/10 hover:border-neon-cyan/50 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                            />

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h3 className="text-xl font-bold">{candidate.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${candidate.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                                            candidate.status === 'Shortlisted' ? 'bg-green-500/20 text-green-400' :
                                                candidate.status === 'Interviewed' ? 'bg-purple-500/20 text-purple-400' :
                                                    'bg-red-500/20 text-red-400'
                                        }`}>
                                        {candidate.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Briefcase size={14} />
                                        {candidate.role}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {candidate.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500" />
                                        {candidate.experience}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {candidate.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 self-end md:self-center">
                                <button className="btn-3d btn-icon btn-ghost p-1.5" title="Message">
                                    <MessageSquare size={14} />
                                </button>
                                <button className="btn-3d btn-icon btn-ghost p-1.5" title="View Profile">
                                    <Eye size={14} />
                                </button>
                                <button className="btn-3d btn-primary">
                                    Schedule Interview
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Candidates;
