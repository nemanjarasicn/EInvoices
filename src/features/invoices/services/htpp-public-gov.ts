import axios from "axios";

const API_KEY: string = "1a51e09d-e74d-4cd5-9d62-67de819e36ff";
/**
 * Axios instance for e.gov API
 */
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PUBLIC_API_URL + "api/publicApi/"
      : "/api/publicApi/",
  headers: {
    "Content-type": "application/json",
    ApiKey: `${API_KEY}`,
  },
});
