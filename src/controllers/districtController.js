import { districtService } from '../services/index.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

export const getAllDistricts = async (req, res) => {
  try {
    const districts = await districtService.getAllDistricts();
    return successResponse(res, districts, 'Districts retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const getDistrictsByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const districts = await districtService.getDistrictsByState(stateId);
    return successResponse(res, districts, 'Districts retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const getDistrictById = async (req, res) => {
  try {
    const { districtId } = req.params;
    const district = await districtService.getDistrictById(districtId);
    
    if (!district) {
      return errorResponse(res, 'District not found', 404);
    }
    
    return successResponse(res, district, 'District retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const createDistrict = async (req, res) => {
  try {
    const district = await districtService.createDistrict(req.body);
    return successResponse(res, district, 'District created successfully', 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const seedDistricts = async (req, res) => {
  try {
    const result = await districtService.seedDistricts();
    return successResponse(res, result, 'Districts seeded successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};
