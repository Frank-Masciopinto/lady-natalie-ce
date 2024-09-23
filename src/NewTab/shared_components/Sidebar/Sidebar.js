/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utils
import trackClick from '../../utils/trackClick';
import trackStat from '../../utils/trackStat';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Context
import { themeContext } from '../../context/ThemeProvider';

// Styles
import './sidebar.scss';

function Sidebar({ refresh }) {
  const currentPath = window.location.pathname;

  // Hooks
  const { user } = useAuth();

  // Context
  const [theme, setTheme] = useContext(themeContext);

  // Others - state
  const [expanded, setExpanded] = useState(false);
  const [page] = useState('home');

  useEffect(() => {
    // navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Functions
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const openInfoModal = () => {
    const infoDialog = document.getElementById('infodialog');
    infoDialog.showModal();
    trackClick('location-info');
    trackStat({ type: 'clicks', property: 'locationInfo' });
  };

  const linkTo = (url) => {
    // navigate to external url
    if (user) {
      window.open(
        `https://app.io/loading?forwardPath=${url}&accessToken=${localStorage.getItem(
          'accessToken'
        )}&refreshToken=${localStorage.getItem(
          'refreshToken'
        )}&colorTheme=${localStorage.getItem('color-theme')}`,
        '_self'
      );
    } else {
      // window.open(`https://app.io`, '_self');
    }
  };

  const toggleTheme = () => {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 ${
        expanded ? (user?.premium ? 'w-52' : 'w-64') : 'w-16'
      } transition-all`}
      style={{ zIndex: 3000 }}
      aria-label="Sidebar"
    >
      <div
        className={`overflow-hidden relative flex flex-col justify-between h-full px-3 py-4 overflow-y-auto rounded sidebar-container ${
          theme === 'dark'
            ? expanded
              ? 'bg-black/80'
              : 'bg-black/50'
            : expanded
            ? 'bg-white/80'
            : 'bg-white/50'
        }`}
      >
        <div
          className="absolute overflow-visible cursor-pointer top-4"
          style={{ right: expanded ? '-20px' : '-30px' }}
          onClick={toggleSidebar}
        >
          {expanded ? (
            <svg
              className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <ul className="mt-10 space-y-2">
          <li>
            <a
              onClick={() => navigate(`/`)}
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'home' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="ml-3">Home</span>
            </a>
          </li>
          {/* <li>
            <a
              onClick={
                user?.isLoggedIn
                  ? () => linkTo(`/search`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'search' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Search</span>
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.isLoggedIn
                  ? () => linkTo(`/blog`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'blog' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Guides</span>
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.isLoggedIn
                  ? () => linkTo(`/favorites`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'favorites' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Favorites</span>
            </a>
          </li>
          {!user?.premium && (
            <li>
              <a
                onClick={
                  user?.isLoggedIn
                    ? () => linkTo(`/pro`)
                    : () => navigate('/login')
                }
                className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  page === 'pro' ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                  fill="currentColor"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: 'new 0 0 512 512' }}
                >
                  <g>
                    <path
                      d="M44.2,83l101.3,89.1L235.7,61c9.3-11.4,26-13.1,37.5-3.8l4.2,4.3L363.5,172L468,81.7c11.1-9.6,27.9-8.4,37.5,2.8
                                            c5,5.8,7.3,13.6,6.2,21.2L471.8,381h-431L0.3,106.9c-2.2-14.5,7.9-28.1,22.4-30.3C30.4,75.4,38.3,77.8,44.2,83z M42.9,407.6h425.8
                                            v26.6c0,14.7-11.9,26.6-26.6,26.6H69.5c-14.7,0-26.6-11.9-26.6-26.6V407.6z"
                    />
                  </g>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Premium</span>
              </a>
            </li>
          )}
          {user?.premium && (
            <li>
              <a
                onClick={
                  user?.isLoggedIn
                    ? () => linkTo(`/nomad`)
                    : () => navigate('/login')
                }
                className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  page === 'pro' ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                  fill="currentColor"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: 'new 0 0 512 512' }}
                >
                  <g>
                    <path
                      d="M44.2,83l101.3,89.1L235.7,61c9.3-11.4,26-13.1,37.5-3.8l4.2,4.3L363.5,172L468,81.7c11.1-9.6,27.9-8.4,37.5,2.8
                                                c5,5.8,7.3,13.6,6.2,21.2L471.8,381h-431L0.3,106.9c-2.2-14.5,7.9-28.1,22.4-30.3C30.4,75.4,38.3,77.8,44.2,83z M42.9,407.6h425.8
                                                v26.6c0,14.7-11.9,26.6-26.6,26.6H69.5c-14.7,0-26.6-11.9-26.6-26.6V407.6z"
                    />
                  </g>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Nomad Tools
                </span>
              </a>
            </li>
          )}
          <li>
            <a
              onClick={
                user?.premium ? () => linkTo(`/maps`) : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer ${
                page === 'passport' ? 'bg-gray-100 dark:bg-gray-700' : ''
              } ${
                user?.premium
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'pointer-events-none text-gray-400 dark:text-gray-500 cursor-default'
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 transition duration-75 ${
                  user?.premium
                    ? 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                    : 'text-gray-500 dark:text-gray-500'
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Maps</span>
              {!user?.premium && (
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">
                  Premium
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.premium
                  ? () => navigate(`/assistant`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer ${
                currentPath.toLowerCase() === '/assistant'
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : ''
              } ${
                user?.premium
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'pointer-events-none text-gray-400 dark:text-gray-500 cursor-default'
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 transition duration-75 ${
                  user?.premium
                    ? 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                    : 'text-gray-500 dark:text-gray-500'
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="flex-1 ml-3 whitespace-nowrap">
                AI Assistant
              </span>
              {!user?.premium && (
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">
                  Premium
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.premium
                  ? () => linkTo(`/community`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer ${
                page === 'community' ? 'bg-gray-100 dark:bg-gray-700' : ''
              } ${
                user?.premium
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'pointer-events-none text-gray-400 dark:text-gray-500 cursor-default'
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 transition duration-75 ${
                  user?.premium
                    ? 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                    : 'text-gray-500 dark:text-gray-500'
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Community</span>
              {!user?.premium && (
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">
                  Premium
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.isLoggedIn
                  ? () => linkTo(`/profile`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'public' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </a>
          </li>
          <li>
            <a
              onClick={
                user?.isLoggedIn
                  ? () => navigate(`/settings`)
                  : () => navigate('/login')
              }
              className={`flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                page === 'settings' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <svg
                className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
            </a>
          </li> */}
        </ul>
        <ul className="pt-4 mt-auto space-y-2">
          <li>
            <a
              onClick={toggleTheme}
              className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              {theme === 'dark' ? (
                <svg
                  className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              <span className="ml-3">Theme</span>
            </a>
          </li>
          {/* {currentPath === '/' && (
            <>
              <li>
                <a
                  onClick={openInfoModal}
                  className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-none ml-3">Location Info</span>
                </a>
              </li>
              <li>
                <a
                  onClick={refresh}
                  className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`flex-shrink-0 w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-none ml-3">New Image</span>
                </a>
              </li>
            </>
          )} */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
