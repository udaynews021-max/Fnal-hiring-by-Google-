import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import JobCard from '../../components/JobCard';

const Jobs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const jobs = [
        {
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            salary: '$120k - $180k',
            type: 'Full-time',
            logo: '🚀',
            tags: ['React', 'TypeScript', 'Tailwind'],
        },
        {
            title: 'UX/UI Designer',
            company: 'DesignHub',
            location: 'New York, NY',
            salary: '$90k - $130k',
            type: 'Full-time',
            logo: '🎨',
            tags: ['Figma', 'Adobe XD', 'Prototyping'],
        },
        {
            title: 'DevOps Engineer',
            company: 'CloudSystems',
            location: 'Remote',
            salary: '$110k - $160k',
            type: 'Remote',
            logo: '☁️',
            tags: ['AWS', 'Docker', 'Kubernetes'],
        },
        {
            title: 'Data Scientist',
            company: 'AI Innovations',
            location: 'London, UK',
            salary: '$100k - $150k',
            type: 'Hybrid',
            logo: '🤖',
            tags: ['Python', 'ML', 'TensorFlow'],
        },
        {
            title: 'Backend Developer',
            company: 'ServerSide Solutions',
            location: 'Austin, TX',
            salary: '$115k - $165k',
            type: 'Full-time',
            logo: '⚙️',
            tags: ['Node.js', 'PostgreSQL', 'Redis'],
        },
        {
            title: 'Product Manager',
            company: 'Visionary Tech',
            location: 'Seattle, WA',
            salary: '$130k - $190k',
            type: 'Full-time',
            logo: '💡',
            tags: ['Agile', 'Strategy', 'Roadmap'],
        },
    ];

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
                    <p className="text-gray-400">Browse thousands of jobs from top companies and startups.</p>
                </div>
            </motion.div>

            {/* Search & Filter Bar */}
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
                        placeholder="Search by job title, company, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                </div>
                <button className="btn-3d btn-secondary flex items-center gap-2">
                    <Filter size={16} />
                    Filters
                </button>
            </motion.div>

            {/* Job Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredJobs.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                    >
                        <JobCard {...job} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
