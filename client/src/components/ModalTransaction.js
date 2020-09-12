import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { splitYearMonthDayFrom } from '../utils/dateUtils';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
  isUpdate,
}) {
  const id = isUpdate ? selectedTransaction.id : '';
  const type = isUpdate ? selectedTransaction.type : '';
  const description = isUpdate ? selectedTransaction.description : '';
  const category = isUpdate ? selectedTransaction.category : '';
  const value = isUpdate ? selectedTransaction.value : '';
  const yearMonthDay = isUpdate ? selectedTransaction.yearMonthDay : '';

  const [transactionDescription, setTransactionDescription] = useState(
    description
  );
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionYearMonthDay, setTransactionYearMonthDay] = useState(
    yearMonthDay
  );
  const [transactionType, setTransactionType] = useState(type);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  useEffect(() => {
    if (transactionValue < 0) {
      setErrorMessage('O valor não pode ser menor do que 0');
      return;
    }
    setErrorMessage('');
  }, [transactionValue]);

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(isUpdate);
    if (isUpdate) {
      const formData = {
        id,
        newType: transactionType,
        newDescription: transactionDescription,
        newCategory: transactionCategory,
        newValue: transactionValue,
        newYearMonthDay: transactionYearMonthDay,
      };
      onSave(formData);
      return;
    }

    const yearMonthDayObject = splitYearMonthDayFrom(transactionYearMonthDay);

    const formData = {
      description: transactionDescription,
      value: transactionValue,
      category: transactionCategory,
      type: transactionType,
      year: yearMonthDayObject.year,
      month: yearMonthDayObject.month,
      day: yearMonthDayObject.day,
      yearMonth: yearMonthDayObject.yearMonth,
      yearMonthDay: yearMonthDayObject.yearMonthDay,
    };
    onSave(formData);
  };

  const handleRadioChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleValueChange = (event) => {
    setTransactionValue(+event.target.value);
  };

  const handleInputDescription = (event) => {
    setTransactionDescription(event.target.value);
  };

  const handleInputCategory = (event) => {
    setTransactionCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setTransactionYearMonthDay(event.target.value);
  };

  return (
    <div>
      <Modal style={styles.modal} isOpen={true}>
        <div>
          <span>Lançamento</span>
          <button
            className="waves-effect waves-lights btn red"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="">
            <label>
              <input
                id="radioOutcome"
                type="radio"
                value="-"
                checked={transactionType === '-'}
                onChange={handleRadioChange}
                disabled={isUpdate}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                id="radioIncome"
                type="radio"
                value="+"
                checked={transactionType === '+'}
                onChange={handleRadioChange}
                disabled={isUpdate}
              />
              <span>Receita</span>
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transactionDescription}
              onChange={handleInputDescription}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={transactionCategory}
              onChange={handleInputCategory}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              min="0"
              step="0.1"
              value={transactionValue}
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
            <input
              type="date"
              value={transactionYearMonthDay}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
