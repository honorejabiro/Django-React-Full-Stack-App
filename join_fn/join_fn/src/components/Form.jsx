import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoader(true); 
    api
      .post(route, { username, password })
      .then((response) => {
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoader(false); 
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{method === "login" ? "Login" : "Register"}</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {isLoader && <LoadingIndicator />}
        <button className="form-button">
          {method === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Form;