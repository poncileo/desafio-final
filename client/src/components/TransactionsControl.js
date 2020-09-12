import React from 'react';
import Action from './Action';

export default function TransactionsControl({
  transactions,
  onDelete,
  onUpdate,
}) {
  transactions.sort((a, b) => a.day - b.day);
  const tableTransactions = [];

  let currentDay = transactions[0].day;
  let currentTransactions = [];
  let id = 1;

  transactions.forEach((transaction) => {
    if (transaction.day !== currentDay) {
      tableTransactions.push({
        id: id++,
        day: currentDay,
        transactions: currentTransactions,
      });
      currentDay = transaction.day;
      currentTransactions = [];
    }
    currentTransactions.push(transaction);
  });

  tableTransactions.push({
    id: id++,
    transactions: currentTransactions,
  });

  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    onUpdate(transaction);
  };

  return (
    <>
      {tableTransactions.map(({ id, transactions }) => {
        return (
          <table style={styles.table} className="striped" key={id}>
            <tbody>
              {transactions.map(
                ({ id, day, category, description, value, type }) => {
                  const transactionStyle =
                    type !== '-' ? styles.income : styles.outcome;
                  return (
                    <tr
                      style={{ ...transactionStyle, ...styles.transactionRow }}
                      key={id}
                    >
                      <td style={{ width: '10%' }}>{day}</td>
                      <td style={{ width: '50%' }}>
                        <div>{category}</div>
                        <div>{description}</div>
                      </td>
                      <td style={{ width: '15%' }}>{value}</td>
                      <td style={{ width: '25%' }}>
                        <div>
                          <Action
                            id={id}
                            type={'edit'}
                            onActionClick={handleActionClick}
                          />
                          <Action
                            id={id}
                            type={'delete'}
                            onActionClick={handleActionClick}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        );
      })}
    </>
  );
}

const styles = {
  table: {
    margin: '20px',
    padding: '10px',
  },
  income: {
    backgroundColor: '#b2ffb2',
    margin: '50px',
  },
  outcome: {
    backgroundColor: '#ffb2b2',
  },
  transactionRow: {
    display: 'block',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    margin: '5px',
  },
};
