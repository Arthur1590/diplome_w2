import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'

const GoodsDetails = () => {
	const { id } = useParams()
	const { goods, loading, error, getGoodById } = useStore()
	const [goodsItem, setGoodsItem] = useState(null)
	const [localLoading, setLocalLoading] = useState(true)

	useEffect(() => {
		const fetchGoodsItem = async () => {
			let item = goods.find(item => item.id === Number(id))
			if (!item) {
				item = await getGoodById(Number(id))
			}
			setGoodsItem(item || null)
			setLocalLoading(false)
		}
		fetchGoodsItem()
	}, [id, goods, getGoodById])

	if (localLoading || loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	if (!goodsItem) return <div>Product not found</div>

	return (
		<div className='goods__details'>
			<div className='container'>
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
					className='swiper'
				>
					<SwiperSlide className='swiper_slide'>
						<img
							className='swiper_img'
							src={goodsItem.images[0]}
							alt={goods.title || 'Image is not available...'}
						/>
					</SwiperSlide>
					<SwiperSlide className='swiper_slide'>
						<img
							className='swiper_img'
							src={goodsItem.images[1]}
							alt={goods.title || 'Image is not available...'}
						/>
					</SwiperSlide>
					<SwiperSlide className='swiper_slide'>
						<img
							className='swiper_img'
							src={goodsItem.images[2]}
							alt={goods.title || 'Image is not available...'}
						/>
					</SwiperSlide>
				</Swiper>
				<article className='content'>
					<h1>{goodsItem.title}</h1>
					<h1>
						Price: {goodsItem.price}$ | Rating: {goodsItem.rating}
					</h1>
					<p>{goodsItem.description}</p>
					<button>Add to Cart</button>
				</article>
			</div>
		</div>
	)
}

export default GoodsDetails
