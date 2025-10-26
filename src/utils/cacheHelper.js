import { config } from '../config/env.js';

export const isCacheValid = (lastUpdated, duration = config.cacheDuration) => {
  if (!lastUpdated) return false;
  const now = Date.now();
  const cacheTime = new Date(lastUpdated).getTime();
  return (now - cacheTime) < duration;
};

export const shouldRefreshCache = (lastUpdated) => {
  return !isCacheValid(lastUpdated);
};

export const getCacheKey = (districtId, year, month) => {
  return `${districtId}_${year}_${month}`;
};
