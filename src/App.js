import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './components/Login.jsx';
import Registration from '../src/components/Register.jsx';
import Users from './pages/Users.jsx';
import Books from './pages/Books.jsx';
import Adduser from './pages/Adduser.jsx';
import Edituser from './pages/Edituser.jsx';
import AddBooks from './pages/AddBooks.jsx';
import EditBooks from './pages/EditBooks.jsx';
import AddCategory from './pages/AddCategory.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<Adduser />} />
          <Route path='/users/edit/:id' element={<Edituser />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/add' element={<AddBooks />} />
          <Route path='/books/edit/:id' element={<EditBooks />} />
          <Route path='/categories' element={<AddCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
