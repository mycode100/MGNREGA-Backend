import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || '',
  mgnregaApiBase: process.env.MGNREGA_API_BASE || 'https://nregarep1.nic.in/netnrega',
  cacheDuration: parseInt(process.env.CACHE_DURATION) || 86400000,
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
};

export const validateEnv = () => {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is required');
  }
  return true;
};
