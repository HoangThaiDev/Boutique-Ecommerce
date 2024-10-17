// Import Modules
import axios from "axios";
import store from "../redux/store";
import { actionUser } from "../redux/actionRedux";

const axiosIntance = axios.create({
  proxy: 1,
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosIntance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { isLoggedIn, accessToken } = store.getState().user;

    // Check user logged then add accessToken in header request
    if (isLoggedIn) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosIntance.interceptors.response.use(
  function (response) {
    // Check if a new access token is provided in the headers
    const newAccessToken = response.headers["x-access-token"];

    if (newAccessToken) {
      store.dispatch(
        actionUser.updateAccessToken({ accessToken: newAccessToken })
      );
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosIntance;
