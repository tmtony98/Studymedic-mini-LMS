

import axios from "axios";

const BASEURL = "http://localhost:5000/";

const apiClient = axios.create({
  baseURL: `${BASEURL}`,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🚨 RESPONSE INTERCEPTOR (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // 🔥 token expired / invalid
      localStorage.removeItem("token");

      // optional: redirect to login
      window.location.href = "/login";
    }

    // you can handle other errors here
    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
