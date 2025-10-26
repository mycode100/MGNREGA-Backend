import { performanceService } from '../services/index.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';
import { getCurrentFinancialYear } from '../utils/dateHelper.js';

export const getDistrictPerformance = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { year, month, financialYear } = req.query;

    const performance = await performanceService.getDistrictPerformance(
      districtId,
      year ? parseInt(year) : undefined,
      month ? parseInt(month) : undefined,
      financialYear || getCurrentFinancialYear()
    );

    if (!performance) {
      return errorResponse(res, 'Performance data not available', 404);
    }

    return successResponse(res, performance, 'Performance data retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const getPerformanceTrend = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { months } = req.query;

    const trend = await performanceService.getPerformanceTrend(
      districtId,
      months ? parseInt(months) : 6
    );

    return successResponse(res, trend, 'Performance trend retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const compareWithState = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { financialYear } = req.query;

    const comparison = await performanceService.compareWithState(
      districtId,
      financialYear || getCurrentFinancialYear()
    );

    return successResponse(res, comparison, 'Comparison data retrieved successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

export const refreshPerformanceData = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { year, month, financialYear } = req.query;

    const performance = await performanceService.fetchAndSavePerformance(
      districtId,
      year ? parseInt(year) : undefined,
      month ? parseInt(month) : undefined,
      financialYear || getCurrentFinancialYear()
    );

    if (!performance) {
      return errorResponse(res, 'Failed to refresh performance data', 503);
    }

    return successResponse(res, performance, 'Performance data refreshed successfully');
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};
