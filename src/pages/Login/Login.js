import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AmazonLogo from '../../Amazon_Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { loginInitiate } from '../../redux/actions';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { user } = useSelector((state) => state.data);

	console.log('user=>', user);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, dispatch]);

	const signIn = (e) => {
		e.preventDefault();
		dispatch(loginInitiate(email, password));
		setEmail('');
		setPassword('');
	};

	return (
		<div className='login'>
			<Link to='/'>
				<img src={AmazonLogo} className='login-logo' alt='logo' />
			</Link>
			<div className='login-container'>
				<h1>Sign In</h1>
				<form>
					<h5>E-Mail</h5>
					<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
					<h5>Password</h5>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type='submit' onClick={signIn} className='login-signIn'>
						Sign In
					</button>
				</form>
				<p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
			</div>
			<p>New to Amazon?</p>
			<Link to='/register'>
				<button className='login-register'>Create your Amazon account</button>
			</Link>
		</div>
	);
};

export default Login;
