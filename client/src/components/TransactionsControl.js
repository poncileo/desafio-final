import React from 'react';

export default function Transaction({ transactions }) {
  transactions.sort((a, b) => a.day - b.day);
  return (
    <>
      {transactions.map(() => {
        return (
          <div key={id}>
            <div>{day}</div>
            <div>
              <div>{category}</div>
              <div>{description}</div>
            </div>
            <div>{value}</div>
            <div></div>
          </div>
        );
      })}
    </>
  );
}
