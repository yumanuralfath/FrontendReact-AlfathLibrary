import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booklist = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/books/${bookId}`);
      getBooks();
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };

  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>List Of Books</h2>
      <Link to='/books/add' className='button is-primary mb-2'>
        Add New
      </Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>NO</th>
            <th>ID</th>
            <th>Books Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Release Year</th>
            <th>Price</th>
            <th>Total Page</th>
            <th>Created by</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.category_id}</td>
              <td>
                <img src={book.image} width='112' height='28' alt='Logo' />
              </td>
              <td>{book.release_year}</td>
              <td>{book.price}</td>
              <td>{book.total_page}</td>
              <td>{book.user.name}</td>
              <td>
                <Link
                  to={`/books/edit/${book.id}`}
                  className='button is-small is-info'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book.id)}
                  className='button is-small is-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booklist;
