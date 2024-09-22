'use strict';
import {
  LS,
  notify,
  DOMAIN
} from './constants.js';
const { v1: uuidv1 } = require('uuid');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.message == 'create_notification') {
    console.log('next notify');
    notify(request.title, request.description, './icons/icon_128.png');
  }
});

// Rest of the code remains the same

async function check_if_extension_previously_installed(user) {
  let twoYears_fromNow = new Date(new Date().getTime() + 1000000 * 60000);
  let expirationDateUnixTime = parseInt(
    (twoYears_fromNow.getTime() / 1000).toFixed(0)
  );
  if (
    await chrome.cookies.get({
      url: domain,
      name: 'Extension Installed',
    })
  ) {
    user.free_trial = false;
    await LS.setItem('User_Profile', user);
    notify(
      'Extension Previously Installed',
      'Free Trial Deactivated',
      '../icons/icon_128.png'
    );
  } else {
    //If extension is installed for first time, store a cookie
    chrome.cookies.set(
      {
        name: 'Extension Installed',
        url: domain,
        expirationDate: expirationDateUnixTime,
      },
      function (cookie) {
        console.log('Cookies Added');
      }
    );
  }
}

// background.js

chrome.action.onClicked.addListener(() => {
  // Open the Facebook login page in a new tab
  console.log('Facebook Login');
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == 'install') {
    let today = new Date();
    let user = {
      free_trial_started: today.toString(),
      free_trial: true,
      premium_membership: false,
      premium_expiration: false,
      is_user_logged_in: false
    };
    await LS.setItem('User_Profile', user);
    await LS.setItem('timerMultiLogin', new Date().toString());
    //check_if_extension_previously_installed(user);
    var sessionId = await LS.getItem('sessionId');
    if (!sessionId) {
      await LS.setItem('sessionId', Math.random().toString());
    }
    notify(
      'Revelation Installed Successfully',
      'Get started!',
      './icons/icon_64.png'
    );
  }
});
