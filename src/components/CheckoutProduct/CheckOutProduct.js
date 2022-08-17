import React from 'react';
import { useDispatch } from 'react-redux';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import './CheckoutProduct.css';
import { removeFromBasket } from '../../redux/actions';

const CheckOutProduct = ({ id, title, image, rating, price }) => {
	let dispatch = useDispatch();
	const removeItemFromBasket = () => {
		dispatch(removeFromBasket(id));
	};
	return (
		<div>
			<div className='checkout-product'>
				<img src={image} alt='' className='checkout-product-image' />
				<div className='checkout-product-info'>
					<p className='checkout-product-title'>{title}</p>
					<p className='checkout-product-price'>
						<strong>$</strong>
						<strong>{price}</strong>
					</p>
					<div className='checkout-product-rating'>
						{Array(rating)
							.fill()
							.map((_, index) => (
								<p key={index}>⭐</p>
							))}
					</div>
					<button onClick={removeItemFromBasket}>
						<i>
							<ShoppingCartOutlined />
						</i>
						Remove From Basket
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckOutProduct;
