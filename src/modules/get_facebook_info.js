import { LS, contentScript_Notification } from '../constants';
import { API } from '../api.js';

// Step 1: Get the access token from the redirect URI
function getAccessTokenFromUrl(urlHash) {
  const accessTokenMatch = document.URL.match(/#access_token=([^&]*)/);

  if (accessTokenMatch && accessTokenMatch[1]) {
    return accessTokenMatch[1];
  } else {
    return null;
  }
}

// Step 2: Use the access token to get user info from the Facebook Graph API
function getUserInfo(accessToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v12.0/me?fields=id,name,email&access_token=${accessToken}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('User Info:', data);
        let USER_LS = await LS.getItem('User_Profile');
        resolve(data);
      } else {
        console.error('Error fetching user info:', response.statusText);
        resolve(null);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      resolve(null);
    }
  });
}

async function call_API_login_or_signup(data, user_signing_up) {
  console.log('call_API_login_or_signup');
  //if user signing up
  let USER_LS = await LS.getItem('User_Profile');
  API.signUp(data).then((response) => {
    if (response == 'USER ALREADY IN DATABASE') {
      let title = 'Welcome Back' + data.name;
      let message = 'You have successfully logged in with Facebook';
      contentScript_Notification(title, message);
    } else {
      let title = 'Welcome ' + data.name;
      let message = 'You have successfully signed up with Facebook';
      contentScript_Notification(title, message);
    }
  });
  USER_LS.facebook_details = data;
  USER_LS.is_user_logged_in = true;
  await LS.setItem('User_Profile', USER_LS);
  console.log('User Info:', USER_LS);
  return data;
}

// Step 3: Run the script
export default function getFacebookInfo(user_signing_up) {
  console.log('getFacebookInfo');
  const urlHash = document.URL; // Add the URL hash containing the access token here
  const accessToken = getAccessTokenFromUrl(urlHash);

  if (accessToken) {
    console.log('Access Token:', accessToken);
    getUserInfo(accessToken).then((userInfo) => {
      if (userInfo) {
        call_API_login_or_signup(userInfo, user_signing_up);
      }
    });
  } else {
    console.error('Access token not found in the URL');
  }
}
