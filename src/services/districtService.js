import { District } from '../models/index.js';

class DistrictService {
  async getAllDistricts() {
    try {
      return await District.find({ active: true })
        .select('districtId districtName stateId stateName')
        .sort({ stateName: 1, districtName: 1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch districts: ${error.message}`);
    }
  }

  async getDistrictsByState(stateId) {
    try {
      return await District.find({ stateId, active: true })
        .select('districtId districtName')
        .sort({ districtName: 1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch districts for state: ${error.message}`);
    }
  }

  async getDistrictById(districtId) {
    try {
      return await District.findOne({ districtId, active: true }).lean();
    } catch (error) {
      throw new Error(`Failed to fetch district: ${error.message}`);
    }
  }

  async createDistrict(districtData) {
    try {
      const exists = await District.findOne({ districtId: districtData.districtId });
      if (exists) {
        throw new Error('District already exists');
      }
      
      return await District.create(districtData);
    } catch (error) {
      throw new Error(`Failed to create district: ${error.message}`);
    }
  }

  async updateDistrict(districtId, updateData) {
    try {
      return await District.findOneAndUpdate(
        { districtId },
        updateData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Failed to update district: ${error.message}`);
    }
  }

  async seedDistricts() {
    const sampleDistricts = [
      { districtId: 'AP001', districtName: 'Anantapur', stateId: 'AP', stateName: 'Andhra Pradesh' },
      { districtId: 'AP002', districtName: 'Chittoor', stateId: 'AP', stateName: 'Andhra Pradesh' },
      { districtId: 'TG001', districtName: 'Hyderabad', stateId: 'TG', stateName: 'Telangana' },
      { districtId: 'TG002', districtName: 'Warangal', stateId: 'TG', stateName: 'Telangana' },
      { districtId: 'KA001', districtName: 'Bangalore Urban', stateId: 'KA', stateName: 'Karnataka' },
    ];

    try {
      for (const district of sampleDistricts) {
        await District.findOneAndUpdate(
          { districtId: district.districtId },
          district,
          { upsert: true, new: true }
        );
      }
      return { success: true, count: sampleDistricts.length };
    } catch (error) {
      throw new Error(`Failed to seed districts: ${error.message}`);
    }
  }
}

export default new DistrictService();
