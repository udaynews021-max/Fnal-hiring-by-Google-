import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ icon, rightElement, ...props }) => {
    return (
        <div className="input-group" style={{ marginBottom: '20px' }}>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {icon && (
                    <div style={{
                        position: 'absolute',
                        left: '16px',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {icon}
                    </div>
                )}

                <input
                    {...props}
                    style={{
                        width: '100%',
                        padding: '14px 16px 14px 48px',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#f3f4f6',
                        fontSize: '14px',
                        color: '#1f2937',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.boxShadow = '0 0 0 2px #e5e7eb';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)';
                    }}
                />
            </div>

            {rightElement && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '8px'
                }}>
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default InputField;
