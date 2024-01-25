import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Formadduser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');
  };

  const saveUsers = async (e) => {
    e.preventDefault();
    try {
      // Input validation
      if (!name || !email || !password || !confPassword || !role) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      await axios.post('http://localhost:8080/users', {
        name,
        email,
        password,
        confPassword,
        role,
      });

      // Reset form and navigate on successful save
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('ERROR: Failed to save');
      } else {
        setErrorMessage('ERROR ADD USER');
      }
    }
  };

  const resetForm = () => {
    // Reset all form fields and clear error message
    setName('');
    setEmail('');
    setPassword('');
    setConfPassword('');
    setRole('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Add New User</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={saveUsers}>
              <p className='has-text-centered has-text-danger'>
                {errorMessage}
              </p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='******'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Confirm Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder='******'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Role</label>
                <div className='control'>
                  <div className='select is-fullwidth'>
                    <select
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

export default Formadduser;
