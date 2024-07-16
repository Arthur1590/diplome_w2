import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './pages/Home'
import { RoutePaths } from './routes/router'
import GoodsDetails from './pages/GoodsDetails'
import AddGoods from './pages/AddGoods'

function App() {
	const location = useLocation()

	return (
		<div className='App'>
			<Nav />
			<div className='main'>
				<Routes location={location} key={location.pathname}>
					<Route path={RoutePaths.HOME} element={<Home />} />
					<Route path={RoutePaths.GOODS_DETAILS} element={<GoodsDetails />} />
					<Route path={RoutePaths.ADD} element={<AddGoods />}/>
				</Routes>
			</div>
		</div>
	)
}

export default App
