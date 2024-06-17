import React from 'react'
import s from '../../../pages/pages.module.scss'

const ScrollToTop = () => {
	const ScrollTop = () => {
		window.scrollTo(0, 0)
	}
	return (
		<a href='#' className={s.scrollto} onClick={() => ScrollTop()}>
			↑
		</a>
	)
}

export default ScrollToTop
