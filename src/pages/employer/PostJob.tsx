import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, MapPin, Plus, Sparkles } from 'lucide-react';

const PostJob: React.FC = () => {
    const [jobData, setJobData] = useState({
        title: '',
        type: 'Full-time',
        location: '',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        skills: '',
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateDescription = async () => {
        if (!jobData.title) {
            alert('Please enter a job title first.');
            return;
        }
        setIsGenerating(true);
        try {
            const response = await fetch('http://localhost:3000/api/generate-job-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: jobData.title })
            });
            const data = await response.json();
            setJobData(prev => ({
                ...prev,
                description: data.description,
                requirements: data.requirements,
            }));
        } catch (error) {
            console.error("Generation error:", error);
            // Fallback
            setJobData(prev => ({
                ...prev,
                description: `We are looking for a talented ${jobData.title} to join our dynamic team. You will be responsible for building scalable applications and working closely with cross-functional teams to deliver high-quality software solutions.`,
                requirements: `- 3+ years of experience in related field\n- Strong problem-solving skills\n- Excellent communication abilities\n- Proficiency in modern technologies`,
            }));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Posting job:', jobData);
        alert('Job posted successfully! (Mock)');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
                    <p className="text-gray-400">Create a job listing and let our AI find the perfect candidates for you.</p>
                </div>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div className="p-6 rounded-xl glass border border-white/10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Job Title</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Frontend Developer"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Employment Type</label>
                            <select
                                name="type"
                                value={jobData.type}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:border-neon-cyan transition-colors text-white"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="location"
                                    value={jobData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Remote, New York, NY"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Salary Range</label>
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="salaryMin"
                                        value={jobData.salaryMin}
                                        onChange={handleChange}
                                        placeholder="Min"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="salaryMax"
                                        value={jobData.salaryMax}
                                        onChange={handleChange}
                                        placeholder="Max"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-400">Job Description</label>
                            <button
                                type="button"
                                onClick={handleGenerateDescription}
                                disabled={isGenerating}
                                className="text-xs flex items-center gap-1 text-neon-purple hover:text-neon-pink transition-colors disabled:opacity-50"
                            >
                                <Sparkles size={14} />
                                {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                            </button>
                        </div>
                        <textarea
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Describe the role and responsibilities..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Requirements</label>
                        <textarea
                            name="requirements"
                            value={jobData.requirements}
                            onChange={handleChange}
                            rows={6}
                            placeholder="- List key requirements..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Required Skills (Comma separated)</label>
                        <input
                            type="text"
                            name="skills"
                            value={jobData.skills}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, Python"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:border-neon-cyan transition-colors"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                    >
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple font-bold shadow-neon-cyan hover:shadow-neon-purple transition-all"
                    >
                        <Plus size={20} />
                        Post Job
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default PostJob;
