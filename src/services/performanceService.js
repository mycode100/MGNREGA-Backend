import { Performance } from '../models/index.js';
import { getCurrentFinancialYear, getPreviousMonths } from '../utils/dateHelper.js';
import { isCacheValid } from '../utils/cacheHelper.js';
import mgnregaApi from './mgnregaApi.js';

class PerformanceService {
  async getDistrictPerformance(districtId, year, month, financialYear) {
    try {
      const cachedData = await Performance.findOne({
        districtId,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        financialYear: financialYear || getCurrentFinancialYear(),
      });

      if (cachedData && isCacheValid(cachedData.lastUpdated)) {
        return cachedData;
      }

      const apiData = await this.fetchAndSavePerformance(districtId, year, month, financialYear);
      
      if (!apiData && !cachedData) {
        return null;
      }
      
      return apiData || cachedData;
    } catch (error) {
      console.error('Performance fetch error:', error.message);
      return null;
    }
  }

  async fetchAndSavePerformance(districtId, year, month, financialYear) {
    try {
      const currentYear = year || new Date().getFullYear();
      const currentMonth = month || new Date().getMonth() + 1;
      const currentFY = financialYear || getCurrentFinancialYear();

      const district = await Performance.findOne({ districtId }).select('stateId stateName districtName');
      const stateId = district?.stateId || 'AP';
      const stateName = district?.stateName || 'Andhra Pradesh';
      const districtName = district?.districtName || 'Sample District';

      const apiData = await mgnregaApi.fetchDistrictData(stateId, districtId, currentFY);

      if (!apiData) {
        return null;
      }

      const performanceData = {
        districtId,
        districtName,
        stateId,
        stateName,
        financialYear: currentFY,
        month: currentMonth,
        year: currentYear,
        metrics: apiData,
        lastUpdated: new Date(),
        dataSource: 'api',
      };

      return await Performance.findOneAndUpdate(
        { districtId, year: currentYear, month: currentMonth, financialYear: currentFY },
        performanceData,
        { upsert: true, new: true, runValidators: true }
      );
    } catch (error) {
      console.error('Fetch and save error:', error.message);
      return null;
    }
  }

  async getPerformanceTrend(districtId, months = 6) {
    try {
      const monthsData = getPreviousMonths(months);
      const trends = [];

      for (const { month, year, financialYear } of monthsData) {
        let data = await Performance.findOne({ districtId, month, year, financialYear });
        
        if (!data) {
          data = await this.fetchAndSavePerformance(districtId, year, month, financialYear);
        }
        
        if (data) {
          trends.push(data);
        }
      }

      return trends;
    } catch (error) {
      console.error('Trend fetch error:', error.message);
      return [];
    }
  }

  async compareWithState(districtId, financialYear) {
    try {
      let districtData = await Performance.findOne({ districtId, financialYear });
      
      if (!districtData) {
        districtData = await this.fetchAndSavePerformance(districtId, null, null, financialYear);
        if (!districtData) {
          return null;
        }
      }

      const stateAvg = await Performance.aggregate([
        { $match: { stateId: districtData.stateId, financialYear } },
        {
          $group: {
            _id: null,
            avgWorkDays: { $avg: '$metrics.workDaysGenerated' },
            avgWagesPaid: { $avg: '$metrics.wagesPaid' },
            avgFundUtilized: { $avg: '$metrics.fundUtilized' },
            avgActiveProjects: { $avg: '$metrics.activeProjects' },
          },
        },
      ]);

      return {
        district: districtData.metrics,
        stateAverage: stateAvg[0] || {},
      };
    } catch (error) {
      console.error('Compare with state error:', error.message);
      return null;
    }
  }
}

export default new PerformanceService();
