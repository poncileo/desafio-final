import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import MonthYearSelector from './components/MonthYearSelector';
import TransactionsControl from './components/TransactionsControl';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions('2020-02');
      setAllTransactions(transactions);
    };
    getTransactions();
  }, []);

  return (
    <div className="container center">
      <h4>Controle Financeiro Pessoal</h4>
      <MonthYearSelector />
      <TransactionsControl transactions={allTransactions} />
    </div>
  );
}
