// import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = {
  login: "/check_login",
  logout: "/logout",
};

const tokenKey = "token";

http.setJwt(getJwt());

async function login(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const { data: user } = await http.post(apiEndpoint.login, formData);
  const jwt = user.user[0].token;
  console.log("token");
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

async function logout(username) {
  try {
    await http.post(apiEndpoint.logout, { username });
  } catch (ex) {}
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt;
    // return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
};
