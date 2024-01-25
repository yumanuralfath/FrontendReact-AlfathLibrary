import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditbooks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [image, setImage] = useState('');
  const [release_year, setRelease_year] = useState('');
  const [price, setPrice] = useState('');
  const [total_page, setTotal_page] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBookById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory_id(response.data.category_id);
        setImage(response.data.image);
        setRelease_year(response.data.release_year);
        setPrice(response.data.price);
        setTotal_page(response.data.total_page);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage('Tahun wajib antara 1980 sampai 2021');
        } else {
          setErrorMessage('Gagal Di Load.');
        }
      }
    };
    getBookById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      // Input validation
      if (!title || !release_year || !price || !total_page || !category_id) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      await axios.patch(`http://localhost:8080/books/${id}`, {
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
      navigate('/books'); // Redirect to the books page or another appropriate page
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
    setCategory_id('');
    setImage('');
    setRelease_year('');
    setPrice('');
    setTotal_page('');
    setErrorMessage('');
  };
  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>Edit Books</h2>
      <div>
        <div className='card is-shadowless'>
          <div className='card-content'>
            <div className='content'>
              <form onSubmit={updateProduct}>
                <p className='has-text-centered'>{errorMessage}</p>
                <div className='field'>
                  <label className='label'>Title Book</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Title Book'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Description</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Image</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Url Image'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Release Year</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Release Year'
                      value={release_year}
                      onChange={(e) => setRelease_year(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Price</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Total Page</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Total Page'
                      value={total_page}
                      onChange={(e) => setTotal_page(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Category</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Category ID'
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <button type='submit' className='button is-success'>
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditbooks;
