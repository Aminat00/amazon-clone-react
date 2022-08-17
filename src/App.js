import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import { useDispatch } from 'react-redux';
import { auth } from './utils/firebase';
import { setuser } from './redux/actions';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51LXh1YLGRwLIVinm8oZ3eAa5wd2esKkWbjKkLKnKk1QwIkEYMTOXUDlvhfuJcvGnoyzzIVBvbwe9gJcvdgPJUd2k004AVBLlDt');
function App() {
	let dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(setuser(authUser));
			} else {
				dispatch(setuser(null));
			}
		});
	}, [dispatch]);
	return (
		<div className='App'>
			<Routes>
				<Route path='/products/:id' element={<SingleProduct></SingleProduct>}></Route>
				<Route path='/' element={<Home> </Home>}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/checkout' element={<Checkout />}></Route>

				<Route
					path='/payment'
					element={
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					}></Route>
			</Routes>
		</div>
	);
}

export default App;
