import { create } from 'zustand'

interface IGoodsComments {
	rating: number
	comment: string
	date: number
	reviewerName: string
	reviewerEmail: string
}
interface Icategories {
	title: string
}
interface IGoodsItems {
	title: string
	id: number
	description: string
	images: string
	thumbnail: string
	price: number
	rating: number
	brand: string
	category: string
	stock: number
	discountPercentage: number
	reviews: IGoodsComments[]
}
interface IGoods {
	originalGoods: IGoodsItems[]
	goods: IGoodsItems[]
	categories: Icategories[]
	loading: boolean
	error: null | string
	currentPage: number
	limit: number
	getGoodById: (id: number) => Promise<IGoodsItems | undefined>
	incStock: (id: number, newStock: number) => void
	deleteItem: (id: number) => void
	setCurrentPage: (page: any) => void
	getGoods: () => Promise<void>
	sortbyPrice: (ascending: boolean) => void
	sortbyRate: (ascending: boolean) => void
	filterByCategory: (category: string) => void
	products: IGoodsItems[]
	setProduct: (products: IGoodsItems[]) => void
	addProduct: (product: IGoodsItems) => void
}
export const useStore = create<IGoods>((set, get) => ({
	originalGoods: [],
	products: [],
	goods: [],
	categories: [],
	loading: false,
	error: null,
	currentPage: 1,
	limit: 12,
	getGoods: async () => {
		set({ loading: true, error: null })
		try {
			const res = await fetch(`https://dummyjson.com/products?limit=200`)
			const data = await res.json()
			set({
				originalGoods: data.products,
				goods: data.products,
				loading: false,
			})
			const categories = [
				...new Set(data.products.map((item: any) => item.category)),
			]
			console.log('Полученные категории:', categories)
		} catch (error: any) {
			set({ error: error.message, loading: false })
		}
	},
	setCurrentPage: page => set({ currentPage: page }),
	getGoodById: async id => {
		set({ loading: true, error: null })
		try {
			const res = await fetch(`https://dummyjson.com/products/${id}`)
			const data = await res.json()
			set({ loading: false })
			return data
		} catch (error: any) {
			set({ error: error.message, loading: false })
			return undefined
		}
	},
	sortbyPrice: ascending =>
		set(state => ({
			goods: state.goods
				.slice()
				.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price)),
		})),
	sortbyRate: ascending =>
		set(state => ({
			goods: state.goods
				.slice()
				.sort((a, b) =>
					ascending ? a.rating - b.rating : b.rating - a.rating
				),
		})),
	filterByCategory: category =>
		set(state => ({
			goods: state.originalGoods.filter(item => item.category === category),
		})),
	incStock: (id, newStock) =>
		set(state => ({
			goods: state.goods.map(item =>
				item.id === id ? { ...item, stock: newStock } : item
			),
		})),
	resetFilter: () =>
		set(state => ({
			goods: state.originalGoods,
		})),
	deleteItem: id =>
		set(state => ({
			goods: state.goods.filter(item => item.id !== id),
		})),
	setProduct: products => set({ products }),
	addProduct: product =>
		set(state => ({
			products: [...state.products, product],
		})),
}))
