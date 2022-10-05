import axios from "axios";
/**
 * Axios instance for public mock
 */
export default axios.create({
  baseURL: "/assets/",
  headers: {
    "Content-type": "application/json",
  },
});
