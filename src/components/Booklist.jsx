import React, { useState, useEffect } from 'react';
import BookFilter from './Bookfilter.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [categories, setCategories] = useState({});

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize the filteredBooks with all books
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categories');
      setCategories(
        response.data.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error fetching categories:', error.message);
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

  const handleFilter = (filter) => {
    let filteredBooks = books.filter((book) => {
      let titleMatch = true;
      if (filter.title) {
        titleMatch = book.title
          .toLowerCase()
          .includes(filter.title.toLowerCase());
      }
      let yearMatch = true;
      if (filter.minYear || filter.maxYear) {
        const bookYear = parseInt(book.release_year, 10);
        yearMatch =
          (!filter.minYear || bookYear >= filter.minYear) &&
          (!filter.maxYear || bookYear <= filter.maxYear);
      }
      return titleMatch && yearMatch;
    });

    if (filter.sortBy === 'asc') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sortBy === 'desc') {
      filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredBooks(filteredBooks);
  };

  const categoryBooks = categories;

  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>List Of Books</h2>
      <Link to='/books/add' className='button is-primary mb-2'>
        Add New
      </Link>
      <BookFilter onFilter={handleFilter} />{' '}
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
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{categoryBooks[book.category_id]}</td>
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
