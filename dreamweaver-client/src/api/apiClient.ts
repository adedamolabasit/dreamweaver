import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    let token = Cookies.get("token");

    if (token?.startsWith('"') && token?.endsWith('"')) {
      token = token.slice(1, -1);
    }

    console.log(token,'zll')

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
