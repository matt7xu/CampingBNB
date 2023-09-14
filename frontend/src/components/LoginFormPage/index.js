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
  const [toggleSubmit, setToggleSubmit] = useState(false);

  useEffect(() => {
    if (toggleSubmit) {
      const error = {};
      if (credential.length < 4) {
        error.credential = "Username field is less than 4 characters"
      }
      if (password.length < 6) {
        error.password = "Password field is less than 6 characters"
      }
      setErrors(error);
    }
  }, [credential, password, toggleSubmit])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleSubmit(true);
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
      credential: "Rubeus",
      password: "password"
    }
    return dispatch(sessionActions.login(demo))
  }

  return (
    <div className="login-container">
      <h1 className="loginH1Div">Log In</h1>
      {errors.credential && <p className="error">{errors.credential}</p>}
      <form onSubmit={handleSubmit}>
        <label>

          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
        </label>
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>

        <button className="loginButton" type="submit" disabled={password.length<1}>Log In</button>
      </form>
      <button className="demoLoginButton" onClick={demoLogin} type="submit">Demo User</button>
    </div>
  );
}

export default LoginFormPage;
