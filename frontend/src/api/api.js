import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });

  refreshSubscribers = [];
}

function onRefreshFailed(error) {
  refreshSubscribers.forEach((callback) => {
    callback(null, error);
  });

  refreshSubscribers = [];
}

API.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    if (
      originalRequest?.url?.includes("login/") ||
      originalRequest?.url?.includes("register/") ||
      originalRequest?.url?.includes("token/refresh/")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken, refreshError) => {
          if (refreshError || !newToken) {
            reject(refreshError || error);
            return;
          }

          originalRequest.headers.Authorization =
            `Bearer ${newToken}`;

          resolve(API(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem("access", newAccessToken);

      isRefreshing = false;

      onRefreshed(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return API(originalRequest);

    } catch (refreshError) {
      isRefreshing = false;

      onRefreshFailed(refreshError);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default API;