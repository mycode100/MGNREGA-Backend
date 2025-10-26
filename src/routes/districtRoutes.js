import express from 'express';
import {
  getAllDistricts,
  getDistrictsByState,
  getDistrictById,
  createDistrict,
  seedDistricts,
} from '../controllers/index.js';
import { validateDistrictId, validateStateId } from '../middleware/index.js';

const router = express.Router();

router.get('/', getAllDistricts);
router.get('/state/:stateId', validateStateId, getDistrictsByState);
router.get('/:districtId', validateDistrictId, getDistrictById);
router.post('/', createDistrict);
router.post('/seed', seedDistricts);

export default router;
