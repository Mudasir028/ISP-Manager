import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = {
  login: "/check_login",
  // logout: "/auth/logout",
};

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  // const formData = new FormData();
  // formData.append("username", username);
  // formData.append("password", password);
  const { data: user } = await http.post(apiEndpoint.login, {
    username,
    password,
  });
  const jwt = user.user[0].token;
  localStorage.setItem(tokenKey, jwt);
}

// export function loginWithJwt(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

// export function logout() {
//   localStorage.removeItem(tokenKey);
// }

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
  // loginWithJwt,
  // logout,
  getCurrentUser,
  getJwt,
};
