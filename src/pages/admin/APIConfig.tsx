import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key, ToggleLeft, ToggleRight, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface AIProvider {
    id: string;
    name: string;
    enabled: boolean;
    apiKey: string;
    status: 'connected' | 'disconnected' | 'error';
    latency: string;
}

const APIConfig: React.FC = () => {
    const [providers, setProviders] = useState<AIProvider[]>([
        { id: 'gemini', name: 'Google Gemini Pro', enabled: true, apiKey: '**********************', status: 'connected', latency: '120ms' },
        { id: 'openai', name: 'OpenAI GPT-4', enabled: true, apiKey: '**********************', status: 'connected', latency: '250ms' },
        { id: 'claude', name: 'Anthropic Claude 3', enabled: false, apiKey: '', status: 'disconnected', latency: '-' },
        { id: 'deepseek', name: 'DeepSeek AI', enabled: true, apiKey: '**********************', status: 'connected', latency: '180ms' },
        { id: 'kimi', name: 'Kimi AI', enabled: false, apiKey: '', status: 'disconnected', latency: '-' },
    ]);

    const toggleProvider = (id: string) => {
        setProviders(providers.map(p =>
            p.id === id ? { ...p, enabled: !p.enabled } : p
        ));
    };

    const handleApiKeyChange = (id: string, value: string) => {
        setProviders(providers.map(p =>
            p.id === id ? { ...p, apiKey: value } : p
        ));
    };

    const handleSave = () => {
        // TODO: Save to backend
        alert('API Configurations saved successfully!');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">API Configuration</h1>
                    <p className="text-gray-400">Manage AI service providers and API keys.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple font-semibold shadow-neon-cyan hover:shadow-neon-purple transition-all"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </motion.div>

            <div className="grid gap-6">
                {providers.map((provider, index) => (
                    <motion.div
                        key={provider.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl glass border transition-all ${provider.enabled ? 'border-neon-cyan/30' : 'border-white/10 opacity-75'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Toggle & Name */}
                            <div className="flex items-center gap-4 min-w-[250px]">
                                <button
                                    onClick={() => toggleProvider(provider.id)}
                                    className={`transition-colors ${provider.enabled ? 'text-neon-cyan' : 'text-gray-500'}`}
                                >
                                    {provider.enabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                                </button>
                                <div>
                                    <h3 className="font-bold text-lg">{provider.name}</h3>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-green-400' :
                                                provider.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                                            }`} />
                                        <span className="text-gray-400 capitalize">{provider.status}</span>
                                    </div>
                                </div>
                            </div>

                            {/* API Key Input */}
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        value={provider.apiKey}
                                        onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                                        placeholder={`Enter ${provider.name} API Key`}
                                        disabled={!provider.enabled}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-neon-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Actions & Stats */}
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right hidden md:block">
                                    <div className="text-xs text-gray-400">Latency</div>
                                    <div className="font-mono text-neon-cyan">{provider.latency}</div>
                                </div>
                                <button
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-neon-cyan transition-colors"
                                    title="Test Connection"
                                >
                                    <RefreshCw size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3"
            >
                <AlertTriangle className="text-yellow-400 shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-yellow-400 mb-1">Security Note</h4>
                    <p className="text-sm text-yellow-200/80">
                        API keys are encrypted before storage. However, for maximum security, we recommend rotating your keys regularly and setting up usage limits in your respective provider dashboards.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default APIConfig;
