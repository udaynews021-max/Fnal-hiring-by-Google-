import React from 'react';

interface ToggleSwitchProps {
    selected: 'candidate' | 'employer';
    onChange: (type: 'candidate' | 'employer') => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ selected, onChange }) => {
    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                padding: '4px',
                display: 'flex',
                position: 'relative',
                cursor: 'pointer',
                width: '240px',
                height: '44px',
                boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.8)'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: '4px',
                    top: '4px',
                    bottom: '4px',
                    width: 'calc(50% - 4px)',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '25px',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    transform: selected === 'employer' ? 'translateX(100%)' : 'translateX(0)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
            />

            <div
                onClick={() => onChange('candidate')}
                style={{
                    flex: 1,
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: selected === 'candidate' ? 'white' : '#6b7280',
                    transition: 'color 0.3s',
                    userSelect: 'none'
                }}
            >
                Candidate
            </div>

            <div
                onClick={() => onChange('employer')}
                style={{
                    flex: 1,
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: selected === 'employer' ? 'white' : '#6b7280',
                    transition: 'color 0.3s',
                    userSelect: 'none'
                }}
            >
                Employer
            </div>
        </div>
    );
};

export default ToggleSwitch;
