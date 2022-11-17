import axios from "axios";
// TODO TOKEN AND AUTH

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_GATEWAY + "/api/v1/"
      : "/api/v1/",
  withCredentials: false,
  headers: {
    ContentType: "application/json",
  },
});
