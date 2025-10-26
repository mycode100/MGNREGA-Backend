export const getCurrentFinancialYear = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  return currentMonth >= 4 
    ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` 
    : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
};

export const getFinancialYearRange = (financialYear) => {
  const [startYear] = financialYear.split('-');
  const start = new Date(`${startYear}-04-01`);
  const end = new Date(`${parseInt(startYear) + 1}-03-31`);
  return { start, end };
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1];
};

export const getPreviousMonths = (count = 6) => {
  const months = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      financialYear: getCurrentFinancialYear(),
    });
  }
  
  return months.reverse();
};
