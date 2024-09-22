import React, { useState, useEffect } from 'react';

import TodoList from './TodoList';

// Styling
import "./quickLinks.scss";

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
        {
          localStorage.getItem('chatGptHidden') !== "true" && <a
            href="https://chat.openai.com"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
              <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/chatgpt.png" alt="ChatGPT" style={{ width: '35px', height: '35px' }} />
            </div>
          </a>
        }
        {
          localStorage.getItem('gmailHidden') !== "true" && <a
              href="https://mail.google.com"
              rel="noopener noreferrer"
              className="quickLinksBar__link"
            >
              <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
                <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/gmail.png" alt="ChatGPT" style={{ width: '25px', height: '25px' }} />
              </div>
            </a>
        }
        {
          (localStorage.getItem('googleSearchConsoleHidden') !== "false" && localStorage.getItem('googleSearchConsoleHidden')) && <a
            href="https://search.google.com/search-console"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
              <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/google-search-console.svg" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
            </div>
          </a>
        }
        {
          (localStorage.getItem('googleAnalyticsHidden') !== "false" && localStorage.getItem('googleAnalyticsHidden')) && <a
            href="https://analytics.google.com/analytics/web/"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
              <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/google_analytics-removebg-preview.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
            </div>
          </a>
        }
        {
          (localStorage.getItem('xHidden') !== "false" && localStorage.getItem('xHidden')) && <a
            href="https://www.x.com"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
              <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/x.png" alt="ChatGPT" style={{ width: '35px', height: '35px' }} />
            </div>
          </a>
        }
        {
          (localStorage.getItem('instagramHidden') !== "false" && localStorage.getItem('instagramHidden')) && <a
            href="https://www.instagram.com"
            rel="noopener noreferrer"
            className="quickLinksBar__link"
          >
            <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
              <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/instagram.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
            </div>
          </a>
        }
        {
          (localStorage.getItem('bardHidden') !== "false" && localStorage.getItem('bardHidden')) && <a
          href="https://bard.google.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/bard.svg" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
          </div>
          </a>
        }
        {
          (localStorage.getItem('redditHidden') !== "false" && localStorage.getItem('redditHidden')) && <a
          href="https://www.reddit.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/reddit.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
          </div>
          </a>
        }
        {
          (localStorage.getItem('netflixHidden') !== "false" && localStorage.getItem('netflixHidden')) && <a
          href="https://www.netflix.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/netflix.png" alt="ChatGPT" style={{ width: '35px', height: '35px' }} />
          </div>
          </a>
        }
        {
          (localStorage.getItem('tikTokHidden') !== "false" && localStorage.getItem('tikTokHidden')) && <a
          href="https://www.tiktok.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/tiktok.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
          </div>
          </a>
        }
        {
          (localStorage.getItem('discordHidden') !== "false" && localStorage.getItem('discordHidden')) && <a
          href="https://discord.com/channels/@me"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/discord.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
          </div>
          </a>
        }
        {
          (localStorage.getItem('youtubeHidden') !== "false" && localStorage.getItem('youtubeHidden')) && <a
          href="https://www.youtube.com/"
          rel="noopener noreferrer"
          className="quickLinksBar__link"
          >
          <div style={{ width: '35px', height: '35px', padding: '10px' }} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
            <img src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/youtube.png" alt="ChatGPT" style={{ width: '20px', height: '20px' }} />
          </div>
          </a>
        }
        <div style={{ width: '35px', height: '35px', padding: '5px' }} onClick={() => setShowTodoList(!showTodoList)} className="quickLinksBar__link__icon bg-gray-200 rounded-full dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-black dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

        </div>
      </div>
      {
        showTodoList && <div className="absolute top-16 right-4" style={{ zIndex: 999 }}>
          <TodoList />
        </div>
      }
    </div>
  );
};

export default QuickLinks;
