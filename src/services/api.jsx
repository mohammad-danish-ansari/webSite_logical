import { API_BASE_URL, API_METHODS } from "../constants/apiConstants";

const request = async (url, method = API_METHODS.GET, body = null) => {
  const token = localStorage.getItem("authToken");
  const myHeaders = new Headers();
  if (!(body instanceof FormData)) {
    myHeaders.append("Content-Type", "application/json");
  }
  if (token) {
    myHeaders.append("X-API-KEY", "hydrogen");
    myHeaders.append("Authorization", token);
  }

  const options = {
    method,
    headers: myHeaders,
    ...(body && { body }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


export default request;

// Helper function to construct query parameters
const addQueryParams = (url, query) => {
  if (!query || Object.keys(query).length === 0) return url;
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
// Exporting CRUD functions
export const getApi = (url, query = {}) => {
  const fullUrl = addQueryParams(url, query);
  return request(fullUrl, API_METHODS.GET);
};

export const postApi = (url, body) => request(url, API_METHODS.POST, JSON.stringify(body));
export const putsApi = (url, body) => request(url, API_METHODS.PUT, JSON.stringify(body));
export const deleteApi = (url) => request(url, API_METHODS.DELETE);






