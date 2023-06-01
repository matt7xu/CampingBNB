import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

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

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
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
          console.log(Object.values(data.errors[0]))
          const newError = {
            new: Object.values(data.errors[0])[0]
          }
          setErrors(newError);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <p className="error">{errors.email}</p>}
        {errors.username && <p className="error">{errors.username}</p>}
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        {errors.new && <p className="error">{errors.new}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
