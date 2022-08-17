import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import CheckOutProduct from '../../components/CheckoutProduct/CheckOutProduct';
import { getBasketTotal } from '../../utils/BasketTotal';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../utils/firebase';
import Header from '../../components/Header/Header';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';

const Payment = () => {
	const { basket, user } = useSelector((state) => state.data);

	let dispatch = useDispatch();
	const navigate = useNavigate();
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: 'POST',
				url: `payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);
	const stripe = useStripe();
	const elements = useElements();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ payment_intent }) => {
				setSucceeded(true);
				setError(null);
				setProcessing(false);
				navigate('/orders');
			});
	};

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};
	return (
		<div>
			<Header />
			<div className='payment'>
				<div className='payment-container'>
					<h1>Checkout {<Link to='/checkout'>{basket.length} items</Link>} </h1>
					<div className='payment-section'>
						<div className='payment-title'>
							<h3>Delivery Address</h3>
						</div>
						<div className='payment-address'>
							<p>{user && user.email}</p>
							<p>Al KEN 10/4</p>
							<p>Warsaw, Poland</p>
						</div>
					</div>
					<div className='payment-section'>
						<div className='payment-title'>
							<h3>Reviews items and Delivery</h3>
						</div>
						<div className='payment-items'>{basket && basket.map((item) => <CheckOutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />)}</div>
					</div>
				</div>
				<div className='payment-section'>
					<div className='payment-title'>
						<h3>Payment method</h3>
					</div>
					<div className='payment-details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='payment-priceContainer'>
								<NumberFormat
									renderText={(value) => (
										<>
											<h3>Order Total: {value}</h3>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
