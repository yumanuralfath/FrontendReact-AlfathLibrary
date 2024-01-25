import React, { useState } from 'react';
import axios from 'axios';

const FormAddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/categories', {
        name,
      });
      onAddCategory(response.data);
      setName('');
    } catch (error) {
      console.error('Error adding category:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Category name'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type='submit'>Add Category</button>
    </form>
  );
};

export default FormAddCategory;
