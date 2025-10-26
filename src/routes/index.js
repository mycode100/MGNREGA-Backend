import express from 'express';
import districtRoutes from './districtRoutes.js';
import performanceRoutes from './performanceRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

router.use('/districts', districtRoutes);
router.use('/performance', performanceRoutes);
router.use('/health', healthRoutes);

export default router;
