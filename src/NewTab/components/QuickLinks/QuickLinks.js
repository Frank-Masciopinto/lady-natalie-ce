import React, { useState, useEffect } from 'react';

import TodoList from './TodoList';

// Styling
import './quickLinks.scss';

const QuickLinks = () => {
  const [showTodoList, setShowTodoList] = useState(
    localStorage.getItem('showTodoList') === 'true' ||
      localStorage.getItem('showTodoList') === null
  );

  // Update localStorage when showTodoList changes
  useEffect(() => {
    localStorage.setItem('showTodoList', showTodoList);
  }, [showTodoList]);

  return (
    <div className="">
      <div className="quickLinksBar" style={{ zIndex: 999 }}>
        {localStorage.getItem('chatGptHidden') !== 'true' && (
          <a
            href="https://ladynatalie.pl/"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div
              style={{ width: '35px', height: '35px', padding: '10px' }}
              className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
            >
              <img
                src="/icons/128.png"
                alt="Lady Natalie"
                style={{ width: '35px', height: '35px' }}
              />
            </div>
          </a>
        )}
        {localStorage.getItem('gmailHidden') !== 'true' && (
          <a
            href="https://mail.google.com"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div
              style={{ width: '35px', height: '35px', padding: '10px' }}
              className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
            >
              <img
                src="/icons/gmail.png"
                alt="Gmail"
                style={{ width: '25px', height: '25px' }}
              />
            </div>
          </a>
        )}
        {
          <a
            href="https://www.allegro.pl"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div
              style={{ width: '35px', height: '35px', padding: '10px' }}
              className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
            >
              <img
                src="/icons/allegro.webp"
                alt="allegro shopping"
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </a>
        }

        <a
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
        >
          <div
            style={{ width: '35px', height: '35px', padding: '10px' }}
            className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
          >
            <img
              src="/icons/instagram.png"
              alt="isntagram"
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </a>

        <a
          href="https://www.netflix.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
        >
          <div
            style={{ width: '35px', height: '35px', padding: '10px' }}
            className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
          >
            <img
              src="/icons/netflix.png"
              alt="ChatGPT"
              style={{ width: '35px', height: '35px' }}
            />
          </div>
        </a>

        {
          <a
            href="https://www.youtube.com/"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div
              style={{ width: '35px', height: '35px', padding: '10px' }}
              className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
            >
              <img
                src="/icons/youtube.png"
                alt="ChatGPT"
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </a>
        }
        <div
          style={{ width: '35px', height: '35px', padding: '5px' }}
          onClick={() => setShowTodoList(!showTodoList)}
          className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-black dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      </div>
      {showTodoList && (
        <div className="absolute top-16 right-4" style={{ zIndex: 999 }}>
          <TodoList />
        </div>
      )}
    </div>
  );
};

export default QuickLinks;
