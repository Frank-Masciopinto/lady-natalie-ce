  export default function request(path, options = {}) {
    const {
      headers,
      query = null,
      method = 'GET',
      body,
      ...extraOpts
    } = options;
    let token = localStorage.getItem("accessToken");
  
    // Compose the request configuration object
    const reqOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      ...extraOpts,
    };
  
    // If a body object is passed, automatically stringify it.
    if (body) {
      reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
    }
  
    let queryString = '';
    if (query) {
      // Convert to encoded string and prepend with ?
      queryString = new URLSearchParams(query).toString();
      queryString = queryString && `?${queryString}`;
    }
  
    return fetch(`${process.env.REACT_APP_API_URL}${path}${queryString}`, reqOptions).then((res) => res.json())
  }