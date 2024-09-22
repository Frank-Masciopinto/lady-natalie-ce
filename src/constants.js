//Development environment
//export const DOMAIN = 'http://127.0.0.1:8082/';

//Production environment
export const DOMAIN = 'https://vscanllc.com/';
export const GMAIL_API_pk_KEY =
  '970872214371-v1uek96t2phgrtpft175s6dou5jcrt9k.apps.googleusercontent.com';
export const GMAIL_API_sk_KEY =
  '970872214371-v1uek96t2phgrtpft175s6dou5jcrt9k.apps.googleusercontent.com';
export const buyPremiumUrl = 'https://vscanllc.com/';
export const support_email = 'support@vscanllc.com';
const free_trial_period = 7;
export const null_field = 'N/A';

export const LS = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async (key) => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
  removeItems: (keys) => chrome.storage.local.remove(keys),
};
export async function click(btn) {
  return new Promise((res, rej) => {
    console.log('clicking', btn);
    btn.focus();
    btn.scrollIntoView();
    btn.click();
    btn.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
      })
    );
    btn.dispatchEvent(
      new MouseEvent('mouseup', {
        bubbles: true,
      })
    );
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    res();
  });
}
export const FACEBOOK_APP = {
  appId: '1674798352913956',
  responseType: 'token',
  scope: 'user_likes,email',
  redirect_uri_login: 'https://codecortex.eu/contact/?Facebook=true&',
  redirect_uri_signup:
    'https://codecortex.eu/contact/?Facebook=true&signup=true',
};

export function contentScript_Notification(title, message) {
  chrome.runtime.sendMessage(
    { message: 'create_notification', title: title, description: message },
    function (response) {
      console.log('Notified SW');
    }
  );
}

export function scroll_to_bottom_page() {
  window.scrollBy({
    top: 10000,
    left: 100,
    behavior: 'smooth',
  });
}

export const checkFreeTrialExpiration = async () => {
  console.log('Check Free Trial Expiration()');
  let userProfile = await LS.getItem('User_Profile');
  let startDate = userProfile.free_trial_started;

  const diffInMs = new Date() - new Date(startDate);
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  console.log('Days Passed since beginning of free trial:');
  console.log(diffInDays);
  if (diffInDays > free_trial_period) {
    console.log('Free trial period expired');
    userProfile.free_trial = false;
    await LS.setItem('User_Profile', userProfile);
  } else console.log('Free trial period is ACTIVE');
};

export const fuctionalityStatus = async () => {
  await checkFreeTrialExpiration();
  let isVideoScanEnabled = await LS.getItem('isVideoScanEnabled');
  let userProfile = await LS.getItem('User_Profile');
  console.log(userProfile);
  if (
    (userProfile.free_trial || userProfile.premium_membership) &&
    isVideoScanEnabled
  )
    return true;
  else return false;
};

export const isUserPremiumOrFreeACTIVE = async () => {
  await checkFreeTrialExpiration();
  let userProfile = await LS.getItem('User_Profile');
  console.log(userProfile);
  if (userProfile.free_trial || userProfile.premium_membership) return true;
  else return false;
};

let minutes_interval = 30;
export const interval_check_new_job = minutes_interval * 60 * 1000;

export const API_ENDPOINTS = {
  signUp: DOMAIN + 'api/auth/register',
  logIn: DOMAIN + 'api/auth/login',
};

export function notify(title, message, iconUrl) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 1,
  });
}

export var notifications = {
  logIn_success: function (name, method) {
    let title = 'Welcome back ' + name;
    let message = 'You have successfully logged in with ' + method;
    let iconUrl = '../icons/icon_128.png';
    notify(title, message, iconUrl);
  },
  signUp_success: function (name, method) {
    let title = 'Welcome ' + name;
    let message = 'You have successfully signed up with ' + method;
    let iconUrl = '../icons/icon_128.png';
    notify(title, message, iconUrl);
  },
};
