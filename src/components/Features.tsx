import { motion } from 'framer-motion';
import { Video, Brain, Eye, MessageSquare, BarChart3, Calendar, Shield, Zap } from 'lucide-react';

const features = [
    {
        icon: Video,
        title: 'AI Video Resume Analysis',
        description: 'Upload or record video resumes. Our AI evaluates communication skills, tone, clarity, and knowledge in real-time.',
        gradient: 'from-neon-cyan to-blue-500',
    },
    {
        icon: Brain,
        title: 'Smart AI Assessments',
        description: 'Live video and text-based assessments with AI evaluation. Get instant insights on candidate performance.',
        gradient: 'from-neon-purple to-purple-500',
    },
    {
        icon: Eye,
        title: 'Full Proctoring System',
        description: 'Advanced eye tracking, behavior analysis, and tab switching detection. Ensure fair and honest assessments.',
        gradient: 'from-neon-pink to-red-500',
    },
    {
        icon: MessageSquare,
        title: 'Virtual AI Interviews',
        description: 'Conduct fully proctored virtual interviews with AI-powered analysis of responses and behavior.',
        gradient: 'from-cyan-400 to-teal-500',
    },
    {
        icon: BarChart3,
        title: 'Visual Analytics Reports',
        description: 'Beautiful dashboards with pie charts, graphs, and insights. LinkedIn-style profiles, but 100x better.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: Calendar,
        title: 'Auto Interview Scheduling',
        description: 'Automatic shortlisting and interview scheduling. Send links via WhatsApp or email instantly.',
        gradient: 'from-orange-500 to-red-500',
    },
    {
        icon: Shield,
        title: 'Multi-AI Integration',
        description: 'Powered by Gemini, OpenAI, Claude, DeepSeek, and Kimi AI. Best AI for each specific task.',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        icon: Zap,
        title: 'Lightning Fast Hiring',
        description: 'Reduce recruitment time by 90%. From job posting to candidate selection in minutes, not days.',
        gradient: 'from-yellow-500 to-orange-500',
    },
];

export default function Features() {
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-blue/30 to-space-dark" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient">AI-Powered Features</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                        Revolutionary technology that transforms the hiring process with intelligent automation and deep insights
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="glass glass-hover rounded-2xl p-6 h-full hover:shadow-3d-cyan transition-all duration-300">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
