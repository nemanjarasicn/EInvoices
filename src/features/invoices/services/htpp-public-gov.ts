import axios from "axios";

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
  },
});
