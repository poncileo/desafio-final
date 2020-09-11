import React, { useState, useEffect } from 'react';
import { getPeriodArray } from '../utils/getPeriodArray.js';

const yearMonthPeriod = getPeriodArray(
  new Date(2019, 1, 1),
  new Date(2021, 12, 31)
);

export default function MonthYearSelector({ onFilterChange }) {
  const [yearMonthId, setYearMonthId] = useState(yearMonthPeriod[0].id);
  const [yearMonthDesc, setYearMonthDesc] = useState(
    yearMonthPeriod[0].description
  );
  const [yearMonthFilter, setYearMonthFilter] = useState(
    yearMonthPeriod[0].yearMonth
  );

  useEffect(() => {
    const yearMonthObject = yearMonthPeriod.find(
      (yearMonth) => yearMonth.id === yearMonthId
    );
    setYearMonthDesc(yearMonthObject.description);
    setYearMonthFilter(yearMonthObject.yearMonth);

    onFilterChange(yearMonthFilter);
  }, [yearMonthId]);

  const handleYearMonthChange = (event) => {
    const newYearMonth = parseInt(event.target.value, 10);
    setYearMonthId(newYearMonth);
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
        className="waves-effect waves-lights btn green dark-4"
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
        className="waves-effect waves-lights btn green dark-4"
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
