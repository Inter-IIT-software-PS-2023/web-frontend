import { Route, Routes } from 'react-router'
import Csv from './components/Csv'
import Map from './components/Map'
import Analytics from './components/Analytics'
import Dashboard from './components/Dashboard'
import VerticalLinearStepper from './components/Home'
import './styles/Sidebar.css'
import './styles/Rider.css'
import './styles/Popper.css'
import LoadingScreen from './components/LoadingScreen'

function App() {
	return (
		<div style={{ height: '100vh', display: 'flex' }}>
			<Routes>
				<Route path='/map' element={<Map />} />
				<Route path='/csv' element={<Csv />} />
				<Route path='/analytics' element={<Analytics />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/loading' element={<LoadingScreen />} />
				<Route path='/' element={<VerticalLinearStepper />}></Route>
			</Routes>
		</div>
	)
}

export default App
