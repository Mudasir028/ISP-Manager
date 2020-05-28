import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// default header
// axios.defaults.headers.common["any header Key"] = "add any default header";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  // console.log("Logging the request config of axios", config);
  return config;
});

function setJwt(jwt) {
  console.log(jwt);
  axios.defaults.headers.common["AUTHENTICATION"] = jwt;
  // axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
