import React, { useState } from 'react';

const BookFilter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title, minYear, maxYear, sortBy });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='number'
        placeholder='Min Year'
        value={minYear}
        onChange={(e) => setMinYear(e.target.value)}
      />
      <input
        type='number'
        placeholder='Max Year'
        value={maxYear}
        onChange={(e) => setMaxYear(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value=''>Sort by Title</option>
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </select>
      <button type='submit'>Filter</button>
    </form>
  );
};

export default BookFilter;
