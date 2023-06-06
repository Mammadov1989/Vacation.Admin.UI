import React, { useEffect, useState } from "react";
import api from "../api/api";
import jwt_decode from "jwt-decode";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({
    provider_id: Date.now().toString(),
    grant_type: "password",
    username: "",
    password: "",
  });
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div style={{ color: "red" }} className="error">
        {errorMessages.message}
      </div>
    );

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userdata = await api.auth.signin(data);
      if (userdata === null || userdata.status == 401) {
        setErrorMessages({ name: "password", message: errors.password });
        setErrorMessages({ name: "username", message: errors.username });
      } else {
        var decoded = jwt_decode(userdata.data.token);
        console.log("user", decoded);
        cookie.set("userId", decoded["sub"]);
        window.location.reload(false);
      }
    } catch (error) {
      setErrorMessages({ name: "password", message: errors.password });
      setErrorMessages({ name: "username", message: errors.username });
    }
    // Prevent page reload
  };

  const errors = {
    username: "invalid username or password",
  };

  function _onChange(e) {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div
          className="input-container"
          style={{ marginBottom: "30px", marginTop: "50px" }}
        >
          <label>Username </label>
          <input type="text" name="username" required onChange={_onChange} />
          {renderErrorMessage("username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            onChange={_onChange}
          />
          {renderErrorMessage("username")}
        </div>
        <div className="button-container" style={{ marginTop: "30px" }}>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
