import axios from "axios";

export default axios.create({
  baseURL: "https://mysterious-temple-60293.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    "x-auth-token": localStorage.getItem('token')
  }
});