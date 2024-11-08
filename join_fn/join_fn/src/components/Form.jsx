import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import  "../styles/Form.css"
 
const Form = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate() 
    const handleSubmit = (e) => {
      setIsLoading(true);
      e.preventDefault();
      console.log(`Sending request to: ${import.meta.env.VITE_API_URL}${route}`);
      console.log(`Route is: ${route}`);
      try {
        const res = api.post(route, { username, password })
          .then((response) => {
            if (method === "login") {
              localStorage.setItem(ACCESS_TOKEN, response.data.access);
              localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
              navigate("/");
            } else {
              navigate("/login");
            }
          })
          .catch((errors) => {
            console.log(errors.message);
          });
        } catch (error) {
            console.log(error.message); 
        }
        setIsLoading(false)
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1> {method === "login" ? "Login" : "Register"} </h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button className="form-button">{method === "login" ? "Login" : "Register"}</button>
      </form>
    </div>
  )}

export default Form;
