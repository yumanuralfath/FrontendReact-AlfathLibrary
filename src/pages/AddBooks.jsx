import React, { useEffect } from 'react';
import Layout from './Layout.jsx';
import FormAddbooks from '../components/FormAddbooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice.js';

const AddBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormAddbooks />
    </Layout>
  );
};

export default AddBooks;
