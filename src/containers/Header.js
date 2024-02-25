import { themeChange } from 'theme-change';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import axios from 'axios';

import { NavLink, Routes, Link, useLocation } from 'react-router-dom';

function Header() {
  const { pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme')
  );
  const [profileObj, setProfileObj] = useState({
    name: 'A',
    profilePicture: '',
  });

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setCurrentTheme('darktheme');
      } else {
        setCurrentTheme('lighttheme');
      }
    }
    axios
      .get('/api/auth/me')
      .then((res) =>
        setProfileObj({
          name: res.data.username,
          profilePicture: res.data.profilePicture,
        })
      )
      .catch(() => console.error('error fetching data'));
  }, []);

  function logoutUser() {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <>
      <div className='navbar sticky top-0 bg-base-100  z-10 shadow-md '>
        {/* Menu toogle for mobile view or small screen */}
        <div className='flex-1'>
          <label
            htmlFor='left-sidebar-drawer'
            className='btn btn-primary drawer-button lg:hidden'
          >
            <Bars3Icon className='h-5 inline-block w-5' />
          </label>
          <h1 className='text-2xl font-semibold ml-2'>{pageTitle}</h1>
        </div>

        <div className='flex-none '>
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className='select select-sm mr-4' data-choose-theme>
            <option disabled selected>
              Theme
            </option>
            <option value='light'>Default</option>
            <option value='dark'>Dark</option>
            <option value='forest'>forest</option>
            <option value='lighttheme'>lighttheme</option>
          </select> */}

          {/* Light and dark theme selection toogle **/}
          <label className='swap '>
            <input type='checkbox' />
            <SunIcon
              data-set-theme='lighttheme'
              data-act-class='ACTIVECLASS'
              className={
                'fill-current w-6 h-6 ' +
                (currentTheme === 'darktheme' ? 'swap-on' : 'swap-off')
              }
            />
            <MoonIcon
              data-set-theme='darktheme'
              data-act-class='ACTIVECLASS'
              className={
                'fill-current w-6 h-6 ' +
                (currentTheme === 'lighttheme' ? 'swap-on' : 'swap-off')
              }
            />
          </label>

          {/* Profile icon, opening menu on click */}

          <div className='dropdown dropdown-end ml-4'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              {profileObj.profilePicture !== '' ? (
                <img src={profileObj.profilePicture} alt='Avatar' />
              ) : (
                <div className='avatar placeholder'>
                  <div className='bg-secondary text-neutral-content rounded-full w-8'>
                    <span className='text-sm'>
                      {profileObj.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li className='justify-between'>
                <Link to={'/app/settings-profile'}>Profile Settings</Link>
              </li>
              <div className='divider mt-0 mb-0'></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
