import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal"
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})

    const newErrors = {}

   
    if (username.length > 40) newErrors.username = 'Username must be less than 40 characters'
    if (password.length < 6) newErrors.password = 'Password must be 6 characters or more'
    if (password !== confirmPassword) newErrors.password = 'Confirm Password field must be the same as the Password field'
    if (!email.includes('@') || !email.endsWith('.com') || !email.endsWith('.io') || !email.endsWith('.net') || !email.endsWith('.edu') || email.length < 5) newErrors.email = 'Please provide a valid email'


    console.log('objectvalues ', Object.values(newErrors))
    if (Object.values(newErrors).length) {
      setErrors(newErrors)
      return
    } else {
      await dispatch(signUp(username, email, password))

    }

    // if (password === confirmPassword) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     setErrors(data)
    //   }
    // } else {
    //   setErrors(['Confirm Password field must be the same as the Password field']);
    // }

  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.username && <p className='sign-up-errors'>{errors.username}</p>}
        {errors.email && <p className='sign-up-errors'>{errors.email}</p>}
        {errors.password && <p className='sign-up-errors'>{errors.password}</p>}

        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <label>
          Email random giberish
          <input
            type="email"
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
        <button >Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
