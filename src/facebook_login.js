// facebook_login.js
import { FACEBOOK_APP } from './constants.js';

// Build the Facebook authentication URL
const authURL = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP.appId}&redirect_uri=${encodeURIComponent(
  FACEBOOK_APP.redirect_uri_login
)}&response_type=${FACEBOOK_APP.responseType}&scope=${FACEBOOK_APP.scope}`;

// Redirect the user to the authentication URL
window.location.href = authURL;

// Rest of the code remains the same
