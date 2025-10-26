import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config, validateEnv } from './src/config/env.js';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';
import { errorHandler, notFound, apiLimiter } from './src/middleware/index.js';
import { startScheduledJobs } from './src/jobs/scheduledJobs.js';


validateEnv();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiLimiter, routes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'MGNREGA District Performance API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      districts: '/api/districts',
      performance: '/api/performance/:districtId',
    },
  });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    startScheduledJobs();
    
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
      console.log(`API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};


startServer();
