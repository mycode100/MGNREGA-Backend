export const validateDistrictId = (req, res, next) => {
  const { districtId } = req.params;
  
  if (!districtId || districtId.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'District ID is required',
    });
  }
  
  next();
};

export const validateQueryParams = (req, res, next) => {
  const { year, month, financialYear } = req.query;
  
  if (year && (isNaN(year) || year < 2006 || year > new Date().getFullYear())) {
    return res.status(400).json({
      success: false,
      error: 'Invalid year parameter',
    });
  }
  
  if (month && (isNaN(month) || month < 1 || month > 12)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid month parameter (1-12)',
    });
  }
  
  next();
};

export const validateStateId = (req, res, next) => {
  const { stateId } = req.params;
  
  if (!stateId || stateId.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'State ID is required',
    });
  }
  
  next();
};
