import React, { useEffect } from 'react'
import SectionTitle from '../components/SecTitle/SectionTitle'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination/Pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, EffectCoverflow, Navigation } from 'swiper/modules'
import s from './pages.module.scss'

const Home = () => {
	const {
		getGoods,
		sortbyPrice,
		sortbyRate,
		setCurrentPage,
		filterByCategory,
		resetFilter,
		currentPage,
		goodsPerPage,
		goods,
		loading,
		error,
	} = useStore()
	// ? filters

	// ?
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
						<div className={s.filters__cat}>
							<button onClick={() => filterByCategory('laptops')}>
								laptops
							</button>
							<button onClick={() => filterByCategory('mobile-accessories')}>
								mobile-accessories
							</button>
							<button onClick={() => filterByCategory('beauty')}>beauty</button>
							<button onClick={() => filterByCategory('fragrances')}>
								fragrances
							</button>
							<button onClick={() => filterByCategory('furniture')}>
								furniture
							</button>
							<button onClick={() => filterByCategory('groceries')}>
								groceries
							</button>
							<button onClick={() => filterByCategory('tablets')}>
								tablets
							</button>
							<button onClick={() => filterByCategory('motorcycle')}>
								motorcycle
							</button>
							<button onClick={() => filterByCategory('skin-care')}>
								skin-care
							</button>
							<button onClick={() => filterByCategory('sports-accessories')}>
								sports-accessories
							</button>
							<button onClick={() => filterByCategory('sunglasses')}>
								sunglasses
							</button>
							<button onClick={() => filterByCategory('tops')}>tops</button>
							<button onClick={() => filterByCategory('home-decoration')}>
								home-decoration
							</button>
							<button onClick={() => filterByCategory('kitchen-accessories')}>
								kitchen-accessories
							</button>
							<button onClick={() => filterByCategory('mens-shirts')}>
								mens-shirts
							</button>
							<button onClick={() => filterByCategory('mens-shoes')}>
								mens-shoes
							</button>
							<button onClick={() => filterByCategory('mens-watches')}>
								mens-watches
							</button>
							<button onClick={resetFilter}>RESET</button>
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
									<Swiper
										modules={[Navigation, A11y, EffectCoverflow]}
										spaceBetween={50}
										slidesPerView={1}
										navigation
										effect='coverflow'
										coverflowEffect={{
											rotate: 50,
											stretch: 0,
											depth: 100,
											modifier: 1,
											slideShadows: true,
										}}
										className={s.swiper}
									>
										<SwiperSlide className={s.swiper_slide}>
											<img
												className={s.swiper_img}
												src={item.images[0]}
												alt={item.title || 'Image is not available...'}
											/>
										</SwiperSlide>
										<SwiperSlide className={s.swiper_slide}>
											<img
												className={s.swiper_img}
												src={item.images[1]}
												alt={item.title || 'Image is not available...'}
											/>
										</SwiperSlide>
										<SwiperSlide className={s.swiper_slide}>
											<img
												className={s.swiper_img}
												src={item.images[2]}
												alt={item.title || 'Image is not available...'}
											/>
										</SwiperSlide>
									</Swiper>
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
