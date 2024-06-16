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
	goods: IGoodsItems[]
	categories: Icategories[]
	loading: boolean
	error: null | string
	currentPage: number
	goodsPerPage: number
	getGoodById: (id: number) => Promise<IGoodsItems | undefined>
	setCurrentPage: (page: any) => void
	getGoods: () => Promise<void>
	sortbyPrice: (ascending: boolean) => void
	sortbyRate?: (ascending: boolean) => void
}
export const useStore = create<IGoods>((set, get) => ({
	goods: [],
	categories: [],
	loading: false,
	error: null,
	currentPage: 1,
	goodsPerPage: 12,
	getGoods: async () => {
		set({ loading: true, error: null })
		try {
			const res = await fetch('https://dummyjson.com/products?limit=100')
			const data = await res.json()
			set({ goods: data.products, loading: false })
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
}))
