import express from 'express';
import {
  getDistrictPerformance,
  getPerformanceTrend,
  compareWithState,
  refreshPerformanceData,
} from '../controllers/index.js';
import { validateDistrictId, validateQueryParams } from '../middleware/index.js';
import { strictLimiter } from '../middleware/index.js';

const router = express.Router();

router.get(
  '/:districtId',
  validateDistrictId,
  validateQueryParams,
  getDistrictPerformance
);

router.get(
  '/:districtId/trend',
  validateDistrictId,
  validateQueryParams,
  getPerformanceTrend
);

router.get(
  '/:districtId/compare',
  validateDistrictId,
  validateQueryParams,
  compareWithState
);

router.post(
  '/:districtId/refresh',
  strictLimiter,
  validateDistrictId,
  validateQueryParams,
  refreshPerformanceData
);

export default router;
