'use strict';

import getFacebookInfo from './modules/get_facebook_info.js';

console.log('Revelation - Content Access Token Injected');

function get_Token_Based_on_Website_Used_to_Login(queryParam) {
  console.log(queryParam);
  let referreal_from_Facebook = new URLSearchParams(queryParam).get('Facebook');
  let user_wants_to_signup = new URLSearchParams(queryParam).get('signup');
  if (referreal_from_Facebook) {
    console.log('Facebook access token retrieving');
    console.log('Extracting Facebook Info of User...');
    getFacebookInfo(user_wants_to_signup);
  } else {
    executeFunctionY();
  }
}

function executeFunctionY() {
  console.log('Executing Function Y...');
}

// Usage example:
get_Token_Based_on_Website_Used_to_Login(window.location.search);
