import React from 'react';

export default function AddTransaction({ onCreate }) {
  const handleButtonClick = () => {
    onCreate();
  };
  return (
    <button className="btn" onClick={handleButtonClick}>
      + Novo Lançamento
    </button>
  );
}
