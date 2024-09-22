import { LS } from '../../../src/constants';

function get_Google_User_Info(token) {
  const url =
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
    token;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onreadystatechange = async function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // data contains the user's information
      let userGoogleInfo = JSON.parse(xhr.responseText);
      let USER_LS = await LS.getItem('User_Profile');
      //   API.signUp(data).then((response) => {
      //     if (response == 'USER ALREADY IN DATABASE') {
      //       let title = 'Welcome Back' + data.given_name;
      //       let message = 'You have successfully logged in with Google';
      //       contentScript_Notification(title, message);
      //     } else {
      //       let title = 'Welcome ' + data.given_name;
      //       let message = 'You have successfully signed up with Google';
      //       contentScript_Notification(title, message);
      //     }
      //   });
      USER_LS.is_user_logged_in = true;
      USER_LS.google_info = userGoogleInfo;
      console.log('User Info:', USER_LS);
      await LS.setItem('User_Profile', USER_LS);
    } else if (xhr.status != 200) {
      console.error('Error:', xhr.status, xhr.statusText);
    }
  };
  xhr.send();
}

export default function get_Google_User() {
  console.log('Get Google User');
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }
    // You can use this token to authenticate with Google API or your server.
    console.log(token);
    get_Google_User_Info(token);
  });
}
