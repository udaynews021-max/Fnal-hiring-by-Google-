import React, { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Eye, Monitor, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProctoringWrapperProps {
    children: React.ReactNode;
    onViolation: (type: string) => void;
    isActive: boolean;
}

const ProctoringWrapper: React.FC<ProctoringWrapperProps> = ({ children, onViolation, isActive }) => {
    const [warnings, setWarnings] = useState<string[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const addWarning = useCallback((message: string) => {
        setWarnings(prev => [...prev, message]);
        onViolation(message);

        // Clear warning after 3 seconds
        setTimeout(() => {
            setWarnings(prev => prev.slice(1));
        }, 3000);
    }, [onViolation]);

    useEffect(() => {
        if (!isActive) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                addWarning('Tab switch detected! Please stay on this tab.');
            }
        };

        const handleBlur = () => {
            addWarning('Focus lost! Please click back on the assessment window.');
        };

        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                addWarning('Full screen exited! Please return to full screen.');
            } else {
                setIsFullScreen(true);
            }
        };

        // Prevent right click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            addWarning('Right click is disabled during assessment.');
        };

        // Prevent copy/paste
        const handleCopyPaste = (e: ClipboardEvent) => {
            e.preventDefault();
            addWarning('Copy/Paste is disabled.');
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopyPaste);
        document.addEventListener('paste', handleCopyPaste);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopyPaste);
            document.removeEventListener('paste', handleCopyPaste);
        };
    }, [isActive, addWarning]);

    const requestFullScreen = () => {
        document.documentElement.requestFullscreen().catch((e) => {
            console.error('Error attempting to enable full-screen mode:', e);
        });
    };

    return (
        <div className="relative min-h-screen bg-space-dark">
            {/* Proctoring Status Bar */}
            {isActive && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-500/30 p-2 flex justify-between items-center px-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-red-400 animate-pulse">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="font-bold text-sm uppercase tracking-wider">Proctoring Active</span>
                        </div>
                        <div className="h-4 w-px bg-white/20" />
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Eye size={14} /> Eye Tracking On</span>
                            <span className="flex items-center gap-1"><Monitor size={14} /> Screen Monitored</span>
                        </div>
                    </div>

                    {!isFullScreen && (
                        <button
                            onClick={requestFullScreen}
                            className="flex items-center gap-2 px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors"
                        >
                            <Maximize size={14} />
                            Enable Full Screen
                        </button>
                    )}
                </div>
            )}

            {/* Warning Toasts */}
            <div className="fixed top-16 right-6 z-50 space-y-2">
                <AnimatePresence>
                    {warnings.map((warning, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/90 text-white shadow-lg backdrop-blur-sm"
                        >
                            <AlertTriangle size={20} />
                            <span className="font-medium text-sm">{warning}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Content */}
            <div className={isActive ? 'pt-12' : ''}>
                {children}
            </div>
        </div>
    );
};

export default ProctoringWrapper;
