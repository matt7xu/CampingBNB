import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const error = {};
    if (credential.length < 4) {
      error.credential = "Username field is less than 4 characters"
    }
    if (password.length < 6) {
      error.password = "Password field is less than 6 characters"
    }
    setErrors(error);
  }, [credential, password])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demo = {
      credential: "Demo-lition",
      password: "password"
    }
    return dispatch(sessionActions.login(demo))
  }

  return (
    <div className="login-container">
      <h1>Log In</h1>
      {errors.credential && <p className="error">{errors.credential}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="loginButton" type="submit" disabled={Object.keys(errors).length > 0}>Log In</button>
      </form>
      <button className="demoLoginButton"  onClick={demoLogin} type="submit">Log in as Demo User</button>
    </div>
  );
}

export default LoginFormPage;
