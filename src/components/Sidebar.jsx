import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoPerson,
  IoBook,
  IoHome,
  IoLogOut,
} from 'react-icons/io5';

const SideBar = () => {
  return (
    <div>
      <aside className='menu pl-2 has-shadow'>
        <p className='menu-label'>General</p>
        <ul className='menu-list'>
          <li>
            <NavLink to={'/dashboard'}>
              <IoHome />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={'/books'}>
              <IoBook />
              Collection Book
            </NavLink>
          </li>
        </ul>
        <p className='menu-label'>Admin</p>
        <ul className='menu-list'>
          <li>
            <NavLink to={'/users'}>
              <IoPerson />
              Users
            </NavLink>
          </li>
        </ul>
        <p className='menu-label'>Setting</p>
        <ul className='menu-list'>
          <li>
            <button className='button is-white'>
              <IoLogOut />
              Log Out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
