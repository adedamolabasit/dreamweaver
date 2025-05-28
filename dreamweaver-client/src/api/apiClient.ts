import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Add request interceptor to include the signature
apiClient.interceptors.request.use((config) => {
  const signature = Cookies.get('signature');
  
  if (signature) {
    config.headers['x-signature'] = signature;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;