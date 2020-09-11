import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import MonthYearSelector from './components/MonthYearSelector';
import TransactionsControl from './components/TransactionsControl';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [yearMonthFilter, setYearMonthFilter] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions(yearMonthFilter);

      setAllTransactions(transactions);
    };
    getTransactions();
  }, [yearMonthFilter]);

  const handleFilterChange = (newYearMonthFilter) => {
    console.log(newYearMonthFilter);
    setYearMonthFilter(newYearMonthFilter);
  };

  return (
    <div className="container center">
      <h4>Controle Financeiro Pessoal</h4>
      <MonthYearSelector onFilterChange={handleFilterChange} />
      {allTransactions.length > 0 && (
        <TransactionsControl transactions={allTransactions} />
      )}
    </div>
  );
}
