import React, { useState } from "react";

import './shareIcon.scss';

const ShareIcon = ({ style, hideTooltip, attribution, city, country, countryInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleFirstButtonClick = () => {
        setIsOpen(!isOpen);
        setIsSent(false);
    };

    const openTwitterShare = () => {
        window.open(
          `https://x.com/intent/tweet?hashtags=wedding,ladynatalie&text=LadyNatalie%0a📷`,
          '_blank'
        );
    }

    const shareToPinterest = () => {
        const description = `${city?.trim()}, ${country?.trim()}, wanderlust`;
        const text = `${countryInfo?.emoji} ${city}, ${country} 📷 @wanderlustext`;
    
        const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(attribution.originalImageLink)}&description=${encodeURIComponent(description)}&text=${encodeURIComponent(text)}`;
    
        window.open(pinterestUrl, '_blank', 'width=800,height=600');
    };
    

    const shareToFacebook = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(attribution?.originalImageLink)}`;
        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    };
    
    return (
        <div className="wrapper" style={style?.wrapperWidth ? { width: style?.wrapperWidth } : {}}>
            <div className="content relative flex flex-col">
                <button className={`shareButton bg-gray-200 dark:bg-gray-700/80 main ${isOpen ? 'open' : ''} ${isSent ? 'sent' : ''}`} onClick={handleFirstButtonClick}>
                    <svg className={`share ${isOpen ? 'hidden' : ''} fill-gray-800 dark:fill-gray-200`} style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                        <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                    </svg>
                    <svg className={`share ${isOpen ? '' : 'hidden'} fill-gray-800 dark:fill-gray-200`} style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>

                <button className={`shareButton socialButton bg-gray-200 dark:bg-gray-700/80 fill-gray-800 dark:fill-gray-200 fb ${isOpen ? 'open' : ''}`} onClick={shareToFacebook}>
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                    <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                    </svg>
                </button>

                <button className={`shareButton socialButton bg-gray-200 dark:bg-gray-700/80 fill-gray-800 dark:fill-gray-200 tw ${isOpen ? 'open' : ''}`} onClick={openTwitterShare}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </button>

                <button className={`shareButton socialButton bg-gray-200 dark:bg-gray-700/80 fill-gray-800 dark:fill-gray-200 ig ${isOpen ? 'open' : ''}`} onClick={shareToPinterest}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.5" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>
                </button>
            </div>
        </div>
    )
}

export default ShareIcon;
