import React from 'react'
import s from './nav.module.scss'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<header className={s.header}>
			<div className={s.container}>
				<nav className={s.header__nav}>
					<h1>Web-site.com</h1>
					<ul className={s.header__nav_list}>
						<li className={s.header__nav_list_item}>
							<Link to='/' className={s.header__nav_list_link}>
								Home
							</Link>
						</li>
						<li className={s.header__nav_list_item}>
							<Link to='/about' className={s.header__nav_list_link}>
								About
							</Link>
						</li>
						<li className={s.header__nav_list_item}>
							<Link to='/contacts' className={s.header__nav_list_link}>
								Contacts
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Nav
