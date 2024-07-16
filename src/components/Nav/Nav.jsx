import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.scss'

const Nav = () => {
	return (
		<header className='header'>
			<div className='container'>
				<nav className='header__nav'>
					<h1>Web-site.com</h1>
					<ul className='header__nav_list'>
						<li className='header__nav_list_item'>
							<NavLink to='/' className='header__nav_list_link'>
								Home
							</NavLink>
						</li>
						<li className='header__nav_list_item'>
							<NavLink to='/add' className='header__nav_list_link'>
								Add
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Nav
