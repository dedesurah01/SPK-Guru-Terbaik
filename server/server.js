import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './db.js';
import guruRoutes from './routes/guruRoutes.js';
import penilaianRoutes from './routes/penilaianRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging sederhana untuk setiap request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint Routes
app.use('/api/guru', guruRoutes);
app.use('/api/penilaian', penilaianRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'SPK Guru Nurul Fikri Backend API'
  });
});

// Jalankan server
app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 SPK Guru Nurul Fikri - Express Backend Server`);
  console.log(`📡 URL API: http://localhost:${PORT}`);
  console.log(`====================================================`);
  await testConnection();
});

