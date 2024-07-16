import React, { useState } from 'react'
import s from './pages.module.scss'
import { useStore } from '../store/useStore'

const AddGoods = () => {
	const { addProduct, products } = useStore()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [stock, setStock] = useState('')

	const handleAddProduct = () => {
		const newProduct = {
			title,
			description,
			price: Number(price),
			stock: Number(stock),
			discountPercentage: 0,
			rating: 0,
			brand: 'Brand',
			category: 'Category',
			thumbnail: 'URL',
			images: ['URL'],
		}

		fetch('https://dummyjson.com/products/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newProduct),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				addProduct(data)
			})
			.catch(error => console.error('Error adding product:', error))
	}

	return (
		<div className={s.add}>
			<div className={s.container}>
				<h1 className={s.sec__title}>Add goods!</h1>

				<div className={s.add__menu}>
					<div className={s.controlls}>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Description'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Price'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Stock'
							value={stock}
							onChange={e => setStock(e.target.value)}
						/>
						<button onClick={handleAddProduct}>Add Item</button>
					</div>
				</div>

				<div className={s.add__items}>
					<h1>Your Goods</h1>
					{products &&
						products.map(item => (
							<div key={item.title} className={s.card}>
								<h1>{item.title}</h1>
								<p>{item.description}</p>
								<p>{item.price}$</p>
								<p>{item.stock}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default AddGoods
