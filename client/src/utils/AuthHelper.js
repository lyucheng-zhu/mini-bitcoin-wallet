import decode from "jwt-decode";
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export default class AuthHelper {

  // Checks if there is a saved token and it's still valid
  loggedIn = () => {
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token);
  };

  // Check if token is expired
  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      return (decoded.exp < Date.now() / 1000);
    } catch (err) {
      console.log("expired check failed!");
      return false;
    }
  };

  setToken = idToken => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  };

  // Retrieves the user token from localStorage
  getToken = () => {
    return localStorage.getItem("auth_token");
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = decode(this.getToken());
    console.log("Recieved answer!");
    return answer;
  };

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
