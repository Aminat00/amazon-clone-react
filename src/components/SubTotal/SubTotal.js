import React from 'react';
import './SubTotal.css';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBasketTotal } from '../../utils/BasketTotal';

const SubTotal = () => {
	const { basket, user } = useSelector((state) => state.data);
	let navigate = useNavigate();

	const handleCheckout = () => {
		if (user) {
			navigate('/payment');
		} else {
			navigate('/login');
		}
	};
	return (
		<div className='subtotal'>
			<NumberFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items): <strong>{value}</strong>
						</p>
						<small className='subtotal-gift'>
							<input type='checkbox' />
							This orders contain a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				prefix={'$'}
			/>
			<button onClick={handleCheckout}> Proceed to Checkout</button>
		</div>
	);
};

export default SubTotal;
