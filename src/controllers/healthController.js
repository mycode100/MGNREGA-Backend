import { successResponse, errorResponse } from '../utils/responseHelper.js';
import mongoose from 'mongoose';
import { mgnregaApi } from '../services/index.js';

export const healthCheck = async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    };

    return successResponse(res, health, 'Service is healthy');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const detailedHealth = async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1;
    const apiStatus = await mgnregaApi.testConnection();

    const health = {
      status: dbStatus && apiStatus ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: {
          status: dbStatus ? 'connected' : 'disconnected',
          name: mongoose.connection.name,
        },
        externalApi: {
          status: apiStatus ? 'reachable' : 'unreachable',
        },
      },
      memory: {
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
      },
    };

    return successResponse(res, health, 'Detailed health check');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};
