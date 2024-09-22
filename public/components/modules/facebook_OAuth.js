export default function get_Facebook_User() {
  chrome.tabs.create(
    { url: chrome.runtime.getURL('../html/facebook_login.html') },
    (tab) => {
      // Attach a listener to the new tab
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          // Get the access token from the URL hash
          const accessToken = new URL(tab.url).hash.match(
            /#access_token=([^&]*)/
          )?.[1];

          if (accessToken) {
            // Send the access token to the login page's script
            chrome.tabs.sendMessage(
              tab.id,
              { type: 'FACEBOOK_ACCESS_TOKEN', accessToken: accessToken },
              (response) => {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                } else if (response) {
                  console.log(response);
                }
              }
            );
          }
        }
      });
    }
  );
}
