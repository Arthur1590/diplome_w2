import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import About from './pages/About'
import Home from './pages/Home'
import { RoutePaths } from './routes/router'
import GoodsDetails from './pages/GoodsDetails'

function App() {
	const location = useLocation()
	
	return (
		<div className='App'>
			<Nav />
			<div className='main'>
				<Routes location={location} key={location.pathname}>
					<Route path={RoutePaths.HOME} element={<Home />} />
					<Route path={RoutePaths.ABOUT} element={<About />} />
					<Route path={RoutePaths.GOODS_DETAILS} element={<GoodsDetails />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
