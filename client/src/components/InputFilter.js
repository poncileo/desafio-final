import React from 'react';

export default function InputFilter({ value, onInputFilter }) {
  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    onInputFilter(newValue);
  };
  return (
    <div className="input-field">
      <input
        type="text"
        id="inputFilter"
        value={value}
        onChange={handleFilterChange}
      />
      <label className="active" htmlFor="inputFilter">
        Filtro
      </label>
    </div>
  );
}
