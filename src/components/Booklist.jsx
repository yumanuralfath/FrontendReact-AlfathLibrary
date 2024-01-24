import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booklist = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await axios.get('http://localhost:8080/books');
    setBooks(response.data);
  };
  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>List Of Books</h2>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Books Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Release Year</th>
            <th>Price</th>
            <th>total Page</th>
            <th>Created</th>
            <th>Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            <tr key={books.userId}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Booklist;
