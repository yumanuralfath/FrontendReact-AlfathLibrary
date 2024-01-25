import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Formedituser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      } catch (error) {
        setErrorMessage('Error while fetching user details');
      } finally {
        setLoading(false);
      }
    };

    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !role) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      await axios.patch(`http://localhost:8080/users/${id}`, {
        name,
        email,
        role,
      });

      resetForm();
      navigate('/users');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please check the user ID.');
      } else {
        setErrorMessage('Error while updating user. Please try again later.');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setErrorMessage('');
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className='title'>Users</h1>
          <h2 className='subtitle'>Update User</h2>
          <div className='card is-shadowless'>
            <div className='card-content'>
              <div className='content'>
                <form onSubmit={updateUser}>
                  {errorMessage && (
                    <p className='has-text-centered has-text-danger'>
                      {errorMessage}
                    </p>
                  )}
                  <div className='field'>
                    <label className='label' htmlFor='name'>
                      Name
                    </label>
                    <div className='control'>
                      <input
                        type='text'
                        className='input'
                        id='name'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field'>
                    <label className='label' htmlFor='email'>
                      Email
                    </label>
                    <div className='control'>
                      <input
                        type='text'
                        className='input'
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field'>
                    <label className='label' htmlFor='role'>
                      Role
                    </label>
                    <div className='control'>
                      <div className='select is-fullwidth'>
                        <select
                          id='role'
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value=''>Pilih Role</option>
                          <option value='admin'>Admin</option>
                          <option value='user'>User</option>
                        </select>
                      </div>
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
      )}
    </div>
  );
};

export default Formedituser;
