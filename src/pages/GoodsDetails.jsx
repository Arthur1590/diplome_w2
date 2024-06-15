import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useParams } from 'react-router-dom'

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
				<figure className='figure'>
					<img src={goodsItem.thumbnail} alt='' />
				</figure>
				<article className='content'>
					<h1>{goodsItem.title}</h1>
					<h1>Price: {goodsItem.price}$ | Rating: {goodsItem.rating}</h1>
					<p>{goodsItem.description}</p>
					<button>Add to Cart</button>
				</article>
			</div>
		</div>
	)
}

export default GoodsDetails
