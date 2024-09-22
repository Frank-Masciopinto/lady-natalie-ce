// Step 1: Get the access token from the redirect URI
function getAccessTokenFromUrl() {
    const urlHash = window.location.hash;
    const accessTokenMatch = urlHash.match(/#access_token=([^&]*)/);
  
    if (accessTokenMatch && accessTokenMatch[1]) {
      return accessTokenMatch[1];
    } else {
      return null;
    }
  }
  
  // Step 2: Use the access token to get user info from the Facebook Graph API
  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v12.0/me?fields=id,name,email&access_token=${accessToken}`
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('User Info:', data);
        return data;
      } else {
        console.error('Error fetching user info:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }
  
  // Step 3: Run the script
  const accessToken = getAccessTokenFromUrl();
  
  if (accessToken) {
    console.log('Access Token:', accessToken);
    getUserInfo(accessToken);
  } else {
    console.error('Access token not found in the URL');
  }
  