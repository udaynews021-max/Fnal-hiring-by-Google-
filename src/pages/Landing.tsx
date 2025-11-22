import React from 'react';
import { motion } from 'framer-motion';

const Landing: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center p-8 bg-black/40 rounded-xl backdrop-blur-sm max-w-2xl"
            >
                <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple mb-6">
                    Hire in <span className="underline decoration-4 decoration-neon-cyan">10 minutes</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    AI‑powered hiring that delivers top talent in <strong>10 days</strong>. No more endless screening.
                </p>
                <a
                    href="#"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full text-lg font-medium hover:shadow-lg transition-shadow"
                >
                    Get Started
                </a>
            </motion.div>
        </section>
    );
};

export default Landing;
