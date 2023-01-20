import Map from './components/Map'
import { Route, Routes } from 'react-router'
import Csv from './components/Csv'
import Analytics from './components/Analytics'
import './styles/Sidebar.css'
import './styles/Rider.css'
import Dashboard from './components/Dashboard'
import "./styles/Popper.css"
function App() {
	return (
		<div style={{ height: '100vh', display: 'flex' }}>
			<Routes>
				<Route path='/map' element={<Map />} />
				<Route path='/csv' element={<Csv />} />
				<Route path='/analytics' element={<Analytics />} />
				<Route path='/dashboard' element={<Dashboard />}></Route>
			</Routes>
		</div>
	)
}

export default App
