import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddbooks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [release_year, setRelease_year] = useState('');
  const [price, setPrice] = useState('');
  const [total_page, setTotal_page] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/books');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      // Input validation
      if (!title || !release_year || !price || !total_page || !category_id) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      await axios.post('http://localhost:8080/books', {
        title,
        description,
        category_id,
        image,
        release_year,
        price,
        total_page,
      });

      // Reset form and navigate on successful save
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('Tahun wajib antara 1980 sampai 2021');
      } else {
        setErrorMessage('An error occurred while saving the book.');
      }
    }
  };

  const resetForm = () => {
    // Reset all form fields and clear error message
    setTitle('');
    setDescription('');
    setImage('');
    setRelease_year('');
    setPrice('');
    setTotal_page('');
    setCategory_id('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>Add New Books</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={saveProduct}>
              <p className='has-text-centered has-text-danger'>
                {errorMessage}
              </p>
              <div className='field'>
                <label className='label'>Title Book</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title Book'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Deskripsi Maksimal 250 characters'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Image</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder='Url Image'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Release Year</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={release_year}
                    onChange={(e) => setRelease_year(e.target.value)}
                    placeholder='Release Year'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Price</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Total Page</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={total_page}
                    onChange={(e) => setTotal_page(e.target.value)}
                    placeholder='Total Page'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Category</label>
                <div className='control'>
                  <div className='select'>
                    <select
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                    >
                      <option value=''>Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Save
                  </button>
                </div>
              </div>
              <button onClick={handleClick} className='button is-info'>
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormAddbooks;
