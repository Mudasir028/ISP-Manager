import axios from "axios";
import logger from "./logService";
import Toast from "light-toast";

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
    Toast.fail("An unexpected error occurrred.", 3000);
  }

  return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  // console.log("Logging the request config of axios", config);
  return config;
});

function setJwt(jwt) {
  axios.defaults.headers.common["AUTHENTICATION"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
