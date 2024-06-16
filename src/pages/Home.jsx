import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SecTitle/SectionTitle'
import { useStore } from '../store/useStore'
import s from './pages.module.scss'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination/Pagination'

const Home = () => {
	const {
		getGoods,
		sortbyPrice,
		sortbyRate,
		setCurrentPage,
		currentPage,
		goodsPerPage,
		goods,
		loading,
		error,
	} = useStore()
	const indexOfLastGood = currentPage * goodsPerPage
	const indexOfFirstGood = indexOfLastGood - goodsPerPage
	const currentGoods = goods.slice(indexOfFirstGood, indexOfLastGood)

	// Общее количество страниц
	const totalPages = Math.ceil(goods.length / goodsPerPage)

	useEffect(() => {
		getGoods()
	}, [getGoods])

	if (loading) return <h1 className='LOADING'>Loading...</h1>
	if (error) return <h1 className='ERROR'>Error: {error}</h1>

	return (
		<div className={s.home}>
			<div className='container'>
				<div className={s.goods}>
					<SectionTitle text='Products' />
					<div className={s.filters}>
						<div className={s.filters__price}>
							<button onClick={() => sortbyPrice(false)}>
								The most Expensive
							</button>
							<button onClick={() => sortbyPrice(true)}>The cheapest</button>
						</div>
						<div className={s.filters__rating}>
							<button onClick={() => sortbyRate(false)}>The most Rated</button>
							<button onClick={() => sortbyRate(true)}>The most unrated</button>
						</div>
					</div>
					<div className={s.goods__list}>
						{currentGoods &&
							currentGoods.map(item => (
								<div key={item.id} className={s.goods__list_card}>
									<span className={s.goods__list_card_stock}>
										Stock: {item.stock}
									</span>
									<span className={s.goods__list_card_stock}>
										HOT {item.discountPercentage}%
									</span>
									<h1>{item.title}</h1>
									<img src={item.thumbnail} alt={item.thumbnail} />
									<p>{item.description}</p>
									<div className={s.goods__list_card_item}>
										<div className={s.goods__list_card_item_desc}>
											<p>Brand: {item.brand}</p>
											<p>Category: {item.category}</p>
										</div>
										<div className={s.goods__list_card_item_price}>
											{' '}
											<p>Rating: {item.rating}</p>
											<p>Price: {item.price}$</p>
										</div>
									</div>
									<Link
										to={`/goods/${item.id}`}
										className={s.goods__list_card_btn}
									>
										Learn More
									</Link>
								</div>
							))}
					</div>
				</div>
				
			</div>
			<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={page => setCurrentPage(page)}
				/>
		</div>
	)
}

export default Home
