import axios from "axios";

const AXIOS = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_GATEWAY + "/api/v1/"
      : "/api/v1/",
  withCredentials: false,
  responseType: "arraybuffer"
});

AXIOS.interceptors.request.use(
  (config) => {
    const token: string = JSON.parse(String(sessionStorage.getItem("token")));
    config.headers = {
      ContentType: "application/json",
      apiKey:  "1a51e09d-e74d-4cd5-9d62-67de819e36ff",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default AXIOS;