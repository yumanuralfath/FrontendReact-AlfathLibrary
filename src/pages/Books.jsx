import React, {useEffect} from 'react';
import Layout from './Layout.jsx';
import Booklist from '../components/Booklist.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice.js';

const Books = () => {
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
      <Booklist />
    </Layout>
  );
};

export default Books;
