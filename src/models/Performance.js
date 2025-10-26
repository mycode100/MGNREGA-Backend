import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
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
  },
  stateName: {
    type: String,
    required: true,
  },
  financialYear: {
    type: String,
    required: true,
    index: true,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
  },
  metrics: {
    totalJobCards: {
      type: Number,
      default: 0,
    },
    activeJobCards: {
      type: Number,
      default: 0,
    },
    workDaysGenerated: {
      type: Number,
      default: 0,
    },
    wagesPaid: {
      type: Number,
      default: 0,
    },
    fundUtilized: {
      type: Number,
      default: 0,
    },
    fundAvailable: {
      type: Number,
      default: 0,
    },
    activeProjects: {
      type: Number,
      default: 0,
    },
    completedProjects: {
      type: Number,
      default: 0,
    },
    householdsEmployed: {
      type: Number,
      default: 0,
    },
    averageWageRate: {
      type: Number,
      default: 0,
    },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  dataSource: {
    type: String,
    default: 'api',
  },
}, {
  timestamps: true,
});

performanceSchema.index({ districtId: 1, financialYear: 1, month: 1, year: 1 }, { unique: true });
performanceSchema.index({ stateId: 1, financialYear: 1 });
performanceSchema.index({ lastUpdated: -1 });

export default mongoose.model('Performance', performanceSchema);
