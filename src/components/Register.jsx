import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../components/LogoYuma.png';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const saveUsers = async (e) => {
    e.preventDefault();
    try {
      // Input validation
      if (!name || !email || !password || !confPassword) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      await axios.post('http://localhost:8080/users', {
        name,
        email,
        password,
        confPassword,
        role: 'user', // role otomatis menjadi User
      });

      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('ERROR: REGISTRATION FAILED');
      } else {
        setErrorMessage('ERROR REGISTER');
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Register</h1>
      <h2 className='subtitle'>Create New Account</h2>
      <div className=' container is-flex is-justify-content-center'>
        <img src={logo} alt='Logo' className='' />
      </div>
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

export default RegisterUser;
