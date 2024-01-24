import React, {useEffect} from 'react';
import Layout from './Layout.jsx';
import FormEditbooks from '../components/FormEditBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice.js';

const EditBooks = () => {
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
      <FormEditbooks />
    </Layout>
  );
};

export default EditBooks;
