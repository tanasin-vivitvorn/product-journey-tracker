export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function extractTokenData(key) {
  const token = getToken();
  if (!token) return null;

  try {
    // Split the token into its three parts (header, payload, signature)
    const base64Url = token.split('.')[1];
    
    // Decode the base64Url string into a JSON string
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    
    // Parse the JSON string into an object
    const payload = JSON.parse(jsonPayload);
    
    // Extract and return the FullName from the payload
    return payload[key] || null;
  } catch (error) {
    console.error('Failed to extract FullName from token:', error);
    return null;
  }
}