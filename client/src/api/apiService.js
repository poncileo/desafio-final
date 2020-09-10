import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);

  const transactions = res.data.transactions.map((transaction) => {
    const { day, category, description, type, value } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
    };
  });

  return transactions;
}

export { getAllTransactions };
