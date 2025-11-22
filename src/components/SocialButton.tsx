import React from 'react';
import { Facebook, Linkedin, Chrome } from 'lucide-react';

interface SocialButtonProps {
    icon: 'google' | 'facebook' | 'linkedin';
    onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onClick }) => {
    const getIcon = () => {
        switch (icon) {
            case 'google':
                return <Chrome size={20} />; // Lucide doesn't have Google, using Chrome as proxy or I can use text/svg
            case 'facebook':
                return <Facebook size={20} />;
            case 'linkedin':
                return <Linkedin size={20} />;
            default:
                return null;
        }
    };

    // For Google, we might want a custom SVG if Chrome isn't close enough, but for now Chrome is fine or just a G text.
    // Actually, let's use a text 'G' styled nicely if Chrome looks weird, but Chrome is often used.
    // Let's stick to the design which shows a 'G'. I'll use a custom SVG for Google to be precise.

    const GoogleIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.52 12.29C23.52 11.43 23.44 10.61 23.3 9.82H12V14.45H18.46C18.18 15.92 17.32 17.17 16.05 18.01V20.97H19.92C22.18 18.89 23.52 15.82 23.52 12.29Z" fill="#4285F4" />
            <path d="M12 24C15.24 24 17.96 22.92 19.92 21.11L16.05 18.15C14.98 18.87 13.61 19.29 12 19.29C8.87 19.29 6.22 17.18 5.27 14.34H1.27V17.44C3.25 21.37 7.31 24 12 24Z" fill="#34A853" />
            <path d="M5.27 14.34C5.03 13.63 4.89 12.87 4.89 12.09C4.89 11.31 5.03 10.55 5.27 9.84V6.74H1.27C0.46 8.35 0 10.17 0 12.09C0 14.01 0.46 15.83 1.27 17.44L5.27 14.34Z" fill="#FBBC05" />
            <path d="M12 4.89C13.76 4.89 15.34 5.5 16.58 6.69L20.04 3.23C17.95 1.28 15.23 0 12 0C7.31 0 3.25 2.63 1.27 6.56L5.27 9.66C6.22 6.82 8.87 4.89 12 4.89Z" fill="#EA4335" />
        </svg>
    );

    return (
        <button
            className="social-btn"
            onClick={onClick}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid #e5e7eb',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: icon === 'facebook' ? '#1877F2' : icon === 'linkedin' ? '#0A66C2' : '#333',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {icon === 'google' ? <GoogleIcon /> : getIcon()}
        </button>
    );
};

export default SocialButton;
