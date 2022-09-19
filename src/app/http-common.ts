import axios from "axios";

export default axios.create({
  baseURL: "api/v1/",
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});
