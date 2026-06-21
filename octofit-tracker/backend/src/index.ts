import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import activityRoutes from './routes/activityRoutes';
import teamRoutes from './routes/teamRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import workoutRoutes from './routes/workoutRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) => console.error('✗ MongoDB connection error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════╗
    ║   OctoFit Tracker API Server Running   ║
    ║   Port: ${PORT}                           ║
    ║   Database: ${MONGODB_URI}     ║
    ║   Frontend: http://localhost:5173      ║
    ╚═══════════════════════════════════════╝
  `);
});
