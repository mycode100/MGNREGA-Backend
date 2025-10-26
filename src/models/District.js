import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  districtId: {
    type: String,
    required: true,
    index: true,
  },
  districtName: {
    type: String,
    required: true,
  },
  stateId: {
    type: String,
    required: true,
    index: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

districtSchema.index({ districtId: 1, stateId: 1 }, { unique: true });

export default mongoose.model('District', districtSchema);
