const getPeriodArray = function (startDate, endDate) {
  startDate.setMonth(startDate.getMonth() - 1);
  endDate.setMonth(endDate.getMonth() - 1);

  let currentMonth = '';
  let currentYear = '';
  let shortMonth = '';
  let nextId = 0;

  let dates = [],
    currentDate = startDate;

  while (currentDate.getFullYear() <= endDate.getFullYear()) {
    currentMonth = currentDate.toLocaleString('pt-BR', { month: '2-digit' });
    currentMonth = currentMonth.toLocaleString('pt-BR', { month: '2-digit' });
    currentYear = currentDate.getFullYear();
    shortMonth = currentDate.toLocaleString('pt-BR', { month: 'short' });

    dates.push({
      id: ++nextId,
      month: currentMonth,
      year: currentYear,
      yearMonth: `${currentYear}-${currentMonth}`,
      short: shortMonth,
      long: currentDate.toLocaleString('pt-BR', { month: 'long' }),
      description: `${shortMonth}/${currentYear}`,
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
};
// Example:
// const dates = getPeriodArray(new Date(2019, 1, 1), new Date(2021, 12, 31));

const splitYearMonthDayFrom = (yearMonthDay) => {
  // YYYY-MM-DD in String format
  const year = yearMonthDay.substring(0, 4).trim();
  const month = yearMonthDay.substring(5, 7).trim();
  const day = yearMonthDay.substring(8, 10).trim();
  const yearMonth = `${year}-${month}`;

  return { year, month, day, yearMonth, yearMonthDay };
};

export { getPeriodArray, splitYearMonthDayFrom };
