import axios from 'axios';
import { config } from '../config/env.js';
import { createApiInstance, handleApiError, retryRequest } from '../utils/apiHelper.js';

class MgnregaApiService {
  constructor() {
    this.baseURL = config.mgnregaApiBase;
    this.api = createApiInstance(this.baseURL, 15000);
  }

  async fetchDistrictData(stateId, districtId, financialYear) {
    try {
      const response = await retryRequest(async () => {
        return await this.api.get('/dynamic2/dynamicreport_new4.aspx', {
          params: {
            state_code: stateId,
            district_code: districtId,
            fin_year: financialYear,
          },
        });
      });

      return this.parseDistrictData(response.data);
    } catch (error) {
      console.error('MGNREGA API fetch failed:', error.message);
      return null;
    }
  }

  parseDistrictData(htmlData) {
    const mockData = {
      totalJobCards: Math.floor(Math.random() * 50000) + 10000,
      activeJobCards: Math.floor(Math.random() * 30000) + 5000,
      workDaysGenerated: Math.floor(Math.random() * 500000) + 100000,
      wagesPaid: Math.floor(Math.random() * 10000000) + 1000000,
      fundUtilized: Math.floor(Math.random() * 50000000) + 5000000,
      fundAvailable: Math.floor(Math.random() * 20000000) + 2000000,
      activeProjects: Math.floor(Math.random() * 500) + 50,
      completedProjects: Math.floor(Math.random() * 1000) + 100,
      householdsEmployed: Math.floor(Math.random() * 25000) + 5000,
      averageWageRate: Math.floor(Math.random() * 50) + 200,
    };

    return mockData;
  }

  async fetchStateAverage(stateId, financialYear) {
    try {
      const response = await retryRequest(async () => {
        return await this.api.get('/dynamic2/stateperformance.aspx', {
          params: {
            state_code: stateId,
            fin_year: financialYear,
          },
        });
      });

      return this.parseStateData(response.data);
    } catch (error) {
      console.error('State average fetch failed:', error.message);
      return null;
    }
  }

  parseStateData(htmlData) {
    return {
      avgWorkDaysGenerated: Math.floor(Math.random() * 400000) + 80000,
      avgWagesPaid: Math.floor(Math.random() * 8000000) + 800000,
      avgFundUtilized: Math.floor(Math.random() * 40000000) + 4000000,
      avgActiveProjects: Math.floor(Math.random() * 400) + 40,
    };
  }

  async testConnection() {
    try {
      await this.api.get('/');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new MgnregaApiService();
