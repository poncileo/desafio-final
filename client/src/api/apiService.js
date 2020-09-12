import axios from 'axios';

const API_URL = 'https://ponciigti-desafio-final.herokuapp.com/api/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);

  const transactions = res.data.transactions.map((transaction) => {
    const { description } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
    };
  });

  return transactions;
}

async function getFilteredTransactions(period, filter) {
  const res = await axios.get(
    `${API_URL}?period=${period}&description=${filter}`
  );

  const transactions = res.data.transactions.map((transaction) => {
    const { description } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
    };
  });

  return transactions;
}

async function insertTransaction(transaction) {
  const res = await axios.post(API_URL, transaction);
  return res;
}

async function updateTransaction(transaction) {
  const res = await axios.put(`${API_URL}/${transaction.id}`, transaction);
  return res;
}

async function deleteTransaction(transaction) {
  const res = await axios.delete(`${API_URL}/${transaction.id}`);
  return res;
}

export {
  insertTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getFilteredTransactions,
};
