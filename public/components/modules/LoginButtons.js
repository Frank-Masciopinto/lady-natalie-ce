// D:\WORK\BitBook\public\components\FacebookLoginButton.js
import React from 'react';
import get_Google_User from './google_OAuth';
import get_Facebook_User from './facebook_OAuth';
export const FacebookButton = () => {
  return (
    <button className="facebook-button" onClick={get_Facebook_User}>
      <img
        src="../icons/facebook.gif"
        alt="Facebook Icon"
        className="facebook-icon"
      />
      Login with Facebook
    </button>
  );
};
export const GoogleButton = () => {
  return (
    <button className="google-button" onClick={get_Google_User}>
      <img
        src="../icons/google.png"
        alt="Facebook Icon"
        className="google-icon"
      />
      Login with Google
    </button>
  );
};
