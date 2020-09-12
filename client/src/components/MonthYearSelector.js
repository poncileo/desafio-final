import React, { useState, useEffect } from 'react';
import { getPeriodArray } from '../utils/dateUtils.js';

const yearMonthPeriod = getPeriodArray(
  new Date(2019, 1, 1),
  new Date(2021, 12, 31)
);
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString('pt-BR', { month: '2-digit' });
const currentYearMonth = `${currentYear}-${currentMonth}`;

const currentYearMonthObject = yearMonthPeriod.find(
  (period) => period.yearMonth === currentYearMonth
);

export default function MonthYearSelector({ onFilterChange }) {
  const [yearMonthId, setYearMonthId] = useState(currentYearMonthObject.id);
  const [yearMonthFilter, setYearMonthFilter] = useState(
    currentYearMonthObject.yearMonth
  );
  useEffect(() => {
    onFilterChange(yearMonthFilter);
  }, [yearMonthFilter, onFilterChange]);

  useEffect(() => {
    const yearMonthObject = yearMonthPeriod.find(
      (yearMonth) => yearMonth.id === yearMonthId
    );
    setYearMonthFilter(yearMonthObject.yearMonth);
  }, [yearMonthId]);

  const handleYearMonthChange = (event) => {
    const newYearMonthId = parseInt(event.target.value, 10);
    setYearMonthId(newYearMonthId);
  };

  const handlePreviousItem = () => {
    const previousYearMonthId = yearMonthId - 1;
    setYearMonthId(previousYearMonthId);
  };

  const handleNextItem = () => {
    const nextYearMonthId = yearMonthId + 1;
    setYearMonthId(nextYearMonthId);
  };

  return (
    <div style={styles.flexRow}>
      <button
        className=" waves-lights btn"
        onClick={handlePreviousItem}
        disabled={yearMonthId < 2}
      >
        &lt;
      </button>
      <select
        className="browser-default"
        value={yearMonthId}
        onChange={handleYearMonthChange}
      >
        {yearMonthPeriod.map((yearMonth) => {
          const { id, description } = yearMonth;
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
      <button
        className="waves-lights btn"
        onClick={handleNextItem}
        disabled={yearMonthId === yearMonthPeriod.length}
      >
        &gt;
      </button>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
