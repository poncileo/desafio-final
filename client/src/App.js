import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import * as api from './api/apiService';
import MonthYearSelector from './components/MonthYearSelector';
import TransactionsControl from './components/TransactionsControl';
import ModalTransaction from './components/ModalTransaction';
import Summary from './components/Summary';
import AddTransaction from './components/AddTransaction';
import InputFilter from './components/InputFilter';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionsFilter, setTransactionsFilter] = useState('');
  const [yearMonthFilter, setYearMonthFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [transactionsSummary, setTransactionsSummary] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions(yearMonthFilter);

      setAllTransactions(transactions);
    };
    getTransactions();
  }, [yearMonthFilter, allTransactions]);

  useEffect(() => {
    const getFilteredTransactions = async () => {
      const transactions = await api.getFilteredTransactions(
        yearMonthFilter,
        transactionsFilter
      );
      setFilteredTransactions(transactions);
    };
    getFilteredTransactions();
  }, [transactionsFilter, yearMonthFilter]);

  useEffect(() => {
    const transactionsCount = filteredTransactions.length;

    let incomeTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === '+'
    );
    const totalIncome = incomeTransactions.reduce(
      (acc, curr) => (acc += curr.value),
      0
    );

    let outcomeTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === '-'
    );
    const totalOutcome = outcomeTransactions.reduce(
      (acc, curr) => (acc += curr.value),
      0
    );

    const balance = totalIncome - totalOutcome;

    setTransactionsSummary([
      {
        transactionsCount,
        totalIncome,
        totalOutcome,
        balance,
      },
    ]);
  }, [filteredTransactions]);

  const handleYearMonthChange = (newYearMonthFilter) => {
    setYearMonthFilter(newYearMonthFilter);
  };

  const handleFilterChange = (newValue) => {
    setTransactionsFilter(newValue);
  };

  const handleCreate = () => {
    setIsUpdate(false);
    setIsModalOpen(true);
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (transactionToDelete) => {
    const newTransactions = Object.assign([], filteredTransactions);
    await api.deleteTransaction(transactionToDelete);

    setAllTransactions(newTransactions);
    setFilteredTransactions(Object.assign([], allTransactions));
  };

  const handlePersistData = async (formData) => {
    console.log(formData);
    const {
      id,
      newType,
      newDescription,
      newCategory,
      newValue,
      newYearMonthDay,
    } = formData;

    const newTransactions = Object.assign([], filteredTransactions);

    if (isUpdate) {
      const transactionToPersist = newTransactions.find(
        (transaction) => transaction.id === id
      );
      transactionToPersist.category = newCategory;
      transactionToPersist.description = newDescription;
      transactionToPersist.value = newValue;
      transactionToPersist.newYearMonthDay = newYearMonthDay;

      await api.updateTransaction(transactionToPersist);

      setIsModalOpen(false);
      return;
    }

    await api.insertTransaction(formData);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container center">
      <h4>Controle Financeiro Pessoal</h4>
      <MonthYearSelector onFilterChange={handleYearMonthChange} />
      <Summary>
        {transactionsSummary.map((summary) => {
          return (
            <div key={'1'} style={styles.summary}>
              <span>Lançamentos: {summary.transactionsCount}</span>
              <span>Receitas: {summary.totalIncome}</span>
              <span>Despesas: {summary.totalOutcome}</span>
              <span>Saldo: {summary.balance}</span>
            </div>
          );
        })}
      </Summary>
      <div style={styles.flexRow}>
        <AddTransaction onCreate={handleCreate} />
        <InputFilter
          value={transactionsFilter}
          onInputFilter={handleFilterChange}
        />
      </div>

      {filteredTransactions.length === 0 && <Spinner />}
      {filteredTransactions.length > 0 && (
        <TransactionsControl
          transactions={filteredTransactions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
          isUpdate={isUpdate}
        />
      )}
    </div>
  );
}

const styles = {
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0px',
  },
};
