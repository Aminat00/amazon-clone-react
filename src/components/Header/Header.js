import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';
import { logOutInitiate } from '../../redux/actions';

const Header = () => {
	const { user, basket } = useSelector((state) => state.data);
	let dispatch = useDispatch();
	const handleAuth = () => {
		if (user) {
			dispatch(logOutInitiate());
		}
	};
	return (
		<nav className='header'>
			<Link to={'/'}>
				<img className='header-logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon_logo' />
			</Link>
			<div className='header-option' style={{ marginRight: '-10px' }}>
				<LocationOnOutlinedIcon />
			</div>
			<div className='header-option'>
				<span className='header-option1'>Hello</span>
				<span className='header-option2'>Select your address</span>
			</div>
			<div className='search'>
				<select>
					<option>All</option>
				</select>
				<input type='text' className='searchInput' />
				<SearchIcon className='searchIcon' />
			</div>
			<div className='header-nav'>
				<Link to={`${user ? '/' : '/login'}`} className='header-link'>
					<div onClick={handleAuth} className='header-option'>
						<span className='header-option1'>Hello{user ? user.email : 'Guest'}</span>
						<span className='header-option2'>{user ? 'Sign Out' : 'Sign In'}</span>
					</div>
				</Link>
				<Link to='/orders' className='header-link'>
					<div className='header-option'>
						<span className='header-option1'>Returns</span>
						<span className='header-option2'>& Orders</span>
					</div>
				</Link>
				<Link to='/login' className='header-link'>
					<div className='header-option'>
						<span className='header-option1'>Your</span>
						<span className='header-option2'>Prime</span>
					</div>
				</Link>
				<Link to='/checkout' className='header-link'>
					<div className='header-basket'>
						<ShoppingCartOutlinedIcon />
						<span className='header-option2 basket-count'>{basket && basket.length}</span>
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
