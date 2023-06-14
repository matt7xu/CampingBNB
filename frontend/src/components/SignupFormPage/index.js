import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState(false);

  useEffect(() => {
      const error = {};
      if (username.length < 4) {
        error.username = "Username field is less than 4 characters"
      }
      if (password.length < 6) {
        error.password = "Password field is less than 6 characters"
      }
      if (!email.includes('@')) errors.email = 'Please provide a valid Email';

      setErrors(error);

  }, [username, password, email])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleSubmit(true);
    setErrors({});
    dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors({new:data.errors[0]});
        return
      }
    });
    history.push("/");
    return;
  };
  return (
    <div className="signupPageDiv">
      <h1 className="signupH1Div">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <p className="error">{errors.email}</p>}
        {errors.username && <p className="error">{errors.username}</p>}
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        {errors.new && <p className="error">{errors.new}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </label>

        <label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </label>

        <label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>

        <label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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

        <label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </label>

        <button className="signupSubmitButton" type="submit" disabled={
          username.length < 4 ||
          password.length < 6 ||
          password !== confirmPassword
        }>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
