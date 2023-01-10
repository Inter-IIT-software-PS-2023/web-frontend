import Map from './components/Map'
import { Route, Routes } from 'react-router'
import SidebarMenu from './components/Sidebar'
function App() {
	return (
		<div id='app' style={{ height: '100vh', display: 'flex' }}>
			<SidebarMenu />
			<Routes>
				<Route path='/map' element={<Map />} />
			</Routes>
		</div>
	)
}

export default App
