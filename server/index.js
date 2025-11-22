import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase only if keys are present
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Routes
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
            database: supabase ? 'configured' : 'missing_credentials'
        }
    });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});

// Mock Database for Logs
let systemLogs = [
    { id: 1, timestamp: '2025-11-20 10:30:15', level: 'SUCCESS', message: 'User login successful: john.doe@example.com', source: 'AuthService' },
    { id: 2, timestamp: '2025-11-20 10:32:00', level: 'WARNING', message: 'High latency detected on Gemini API (450ms)', source: 'AIProvider' },
    { id: 3, timestamp: '2025-11-20 10:35:22', level: 'ERROR', message: 'Failed to process video: Format not supported', source: 'VideoService' },
    { id: 4, timestamp: '2025-11-20 10:36:05', level: 'INFO', message: 'New job posted: Senior React Developer', source: 'JobService' },
    { id: 5, timestamp: '2025-11-20 10:40:11', level: 'INFO', message: 'Candidate assessment started: ID #4421', source: 'AssessmentService' },
];

app.get('/api/logs', (req, res) => {
    res.json(systemLogs);
});

app.post('/api/logs', (req, res) => {
    const newLog = {
        id: systemLogs.length + 1,
        timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
        ...req.body
    };
    systemLogs.unshift(newLog);
    res.status(201).json(newLog);
});

app.post('/api/analyze-video', (req, res) => {
    // Simulate processing time
    setTimeout(() => {
        res.json({
            score: Math.floor(Math.random() * 20) + 80, // 80-100
            communication: Math.floor(Math.random() * 20) + 80,
            confidence: Math.floor(Math.random() * 20) + 80,
            knowledge: Math.floor(Math.random() * 20) + 80,
            tone: ['Professional', 'Enthusiastic', 'Calm', 'Confident'][Math.floor(Math.random() * 4)],
            keywords: ['React', 'Node.js', 'Scalability', 'Teamwork', 'Problem Solving', 'Leadership'].sort(() => 0.5 - Math.random()).slice(0, 4),
            feedback: 'Great video! You showed good confidence and clear communication. Try to maintain more eye contact in the next one.'
        });
    }, 2000);
});

app.post('/api/generate-job-description', (req, res) => {
    const { title } = req.body;
    setTimeout(() => {
        res.json({
            description: `We are looking for a talented ${title} to join our dynamic team. You will be responsible for building scalable applications and working closely with cross-functional teams to deliver high-quality software solutions.`,
            requirements: `- 3+ years of experience in related field\n- Strong problem-solving skills\n- Excellent communication abilities\n- Proficiency in modern technologies`
        });
    }, 1500);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    if (!supabase) {
        console.warn('Warning: Supabase credentials not found in .env');
    }
});
