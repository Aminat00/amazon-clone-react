import React, { useState, useEffect } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import AmazonLogo from '../../Amazon_Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { registerInitiate } from '../../redux/actions';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { user } = useSelector((state) => state.data);
	let navigate = useNavigate();
	let dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, dispatch]);

	const register = (e) => {
		e.preventDefault();
		dispatch(registerInitiate(email, password));
		setEmail('');
		setPassword('');
		navigate('/');
	};
	return (
		<div className='register'>
			<Link to='/'>
				<img src={AmazonLogo} className='register-logo' alt='logo' />
			</Link>
			<div className='register-container'>
				<h1>Create Account</h1>
				<form>
					<h5>E-Mail</h5>
					<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
					<h5>Password</h5>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type='submit' onClick={register} className='continue'>
						Continue
					</button>
					<div className='detail'>
						<p> Aleady have an account? </p>
						<Link to='/login' className='signin-link'>
							<p>Sign In</p>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
