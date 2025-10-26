import express from 'express';
import { healthCheck, detailedHealth } from '../controllers/index.js';

const router = express.Router();

router.get('/', healthCheck);
router.get('/detailed', detailedHealth);

export default router;
