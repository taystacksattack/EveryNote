import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import {Link, useHistory} from "react-router-dom";

function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
    history.push('/notes')

        closeModal()
    }
  };

  const handleDemoUser = async (e) => {
    await dispatch(login('demo@aa.io', 'password'))
    history.push('/notes')
    closeModal()

  }

  return (
    <>
    <div id = "login-modal-wrapper">
      <h1>Log In</h1>
      <form
      id = "login-form"
      onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div id="form-items-wrapper">
          <label id="form-items">
            Email
            <input 
              type="text"
              id="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label id="form-items">
            Password
            <input 
              type="password"
              id="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button id="login-button" type="submit">Log In</button>
      </form>
        <Link id='demo-user-link' to='/' onClick={handleDemoUser}>Demo User</Link>
    </div>
    </>
  );
}

export default LoginFormModal;
