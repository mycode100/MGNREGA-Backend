import cron from 'node-cron';
import { performanceService, districtService } from '../services/index.js';
import { getCurrentFinancialYear } from '../utils/dateHelper.js';

export const startScheduledJobs = () => {
  cron.schedule('0 2 * * *', async () => {
    console.log('Running daily performance data refresh...');
    try {
      const districts = await districtService.getAllDistricts();
      const currentFY = getCurrentFinancialYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      for (const district of districts) {
        await performanceService.fetchAndSavePerformance(
          district.districtId,
          currentYear,
          currentMonth,
          currentFY
        );
      }
      
      console.log('Daily data refresh completed successfully');
    } catch (error) {
      console.error('Error in scheduled job:', error.message);
    }
  });

  console.log('Scheduled jobs initialized');
};
