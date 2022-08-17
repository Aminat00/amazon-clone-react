import React from 'react';
import Header from '../../components/Header/Header';
import './Checkout.css';
import { useSelector } from 'react-redux';
import CheckOutProduct from '../../components/CheckoutProduct/CheckOutProduct';
import SubTotal from '../../components/SubTotal/SubTotal';

const Checkout = () => {
	const { basket, user } = useSelector((state) => state.data);
	return (
		<div>
			<Header />
			<div className='checkout'>
				<div className='checkout-left'>
					<img className='checkout-ad' src='https://images-eu.ssl-images-amazon.com/images/G/31/img18/TV/Sanyo/SanyoWebBanner01._CB1198675309_.jpg' alt='' />

					<div>
						<h3>Hello, {user?.email}</h3>
						<h2 className='checkout-title'>{basket.length === 0 ? 'Your basket is empty' : 'Your basket'}</h2>
						{/* {basket && basket.map((item) => <CheckOutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />)} */}
						{basket && basket.map((item) => <CheckOutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />)}
					</div>
				</div>
				<div className='checkout-right'>
					<SubTotal />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
