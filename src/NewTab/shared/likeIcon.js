import React, { useState } from 'react';

import './shareIcon.scss';

const LikeSvg = ({
  toggleFavorite,
  currentImageFavoriteStatus,
  style,
  hideTooltip,
  showBackground,
}) => {
  const [iconHovered, setIconHovered] = useState(false);

  return (
    <div
      className="wrapper"
      style={style?.wrapperWidth ? { width: style?.wrapperWidth } : {}}
    >
      <div className="content relative flex flex-col">
        <div
          style={{ height: 24 }}
          className={`shareButton transition-all ${
            showBackground ? 'bg-gray-200 rounded-full dark:bg-gray-700/80' : ''
          } cursor-pointer controlbar-icon icon hover:scale-110`}
        >
          {hideTooltip ? null : (
            <div className="bg-black tooltip">
              {currentImageFavoriteStatus ? 'Unfavorite' : 'Favorite'}
            </div>
          )}
          <svg
            onClick={toggleFavorite}
            xmlns="http://www.w3.org/2000/svg"
            className="share"
            style={{ width: '24px', height: '24px', zIndex: 100 }}
            viewBox="0 0 24 24"
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            fill={
              currentImageFavoriteStatus
                ? 'rgb(165, 0, 0)'
                : iconHovered
                ? '#b1b1b1'
                : 'none'
            }
            stroke={
              currentImageFavoriteStatus
                ? 'rgb(165, 0, 0)'
                : iconHovered
                ? '#b1b1b1'
                : '#c3c2c7'
            }
            // padding="10px"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LikeSvg;
