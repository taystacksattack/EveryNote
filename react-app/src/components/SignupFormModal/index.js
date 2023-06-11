
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [errors, setErrors] = useState([]);
	
	const [errors, setErrors] = useState({});

	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors({})

		const newErrors = {}


		if (username.length > 40) newErrors.username = 'Username must be less than 40 characters'
		if (username.length < 4) newErrors.username = 'Username must be greater than 3 characters'
		if (password.length < 6) newErrors.password = 'Password must be 6 characters or more'
		if (password !== confirmPassword) newErrors.password = 'Confirm Password field must be the same as the Password field'
		if (!email.includes('@') || (!email.endsWith('.com') && !email.endsWith('.io') && !email.endsWith('.net') && !email.endsWith('.edu'))) newErrors.email = 'Please provide a valid email'
		if (email.length < 5) newErrors.email = 'Email length must be greater than 4 characters'
		if (email.length > 255) newErrors.email = 'Email too long. Please provide an valid email with a length under 255 characters'

		if (Object.values(newErrors).length) {
			setErrors(newErrors)
			return
		} else {
			await dispatch(signUp(username, email, password))
			closeModal()
		}


		// if (password === confirmPassword) {
		// 	const data = await dispatch(signUp(username, email, password));
		// 	if (data) {
		// 		setErrors(data);
		// 	} else {
		// 		closeModal();
		// 	}
		// } else {
		// 	setErrors([
		// 		"Confirm Password field must be the same as the Password field",
		// 	]);
		// }
	};

	return (
		<>
			<div id="signup-modal-wrapper">
				<div id="sign-up-title">
					<h1 >Sign Up</h1>
				</div>
				<form
					id="signup-form"
					onSubmit={handleSubmit}>
					{/* <ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul> */}

					{errors.username && <p className='sign-up-errors'>{errors.username}</p>}
					{errors.email && <p className='sign-up-errors'>{errors.email}</p>}
					{errors.password && <p className='sign-up-errors'>{errors.password}</p>}
					<div id="form-items-wrapper">
						<label id="form-items">
							Email 
							<input className= 'input'
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<label id="form-items">
							Username
							<input className= 'input'
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</label>
						<label id="form-items">
							Password
							<input className= 'input'
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<label id="form-items">
							Confirm Password
							<input className= 'input'
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<button id="signup-button" type="submit">Sign Up</button>
				</form>
			</div>
		</>
	);
}

export default SignupFormModal;
