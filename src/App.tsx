import Map from './components/Map'
import { Route, Routes } from 'react-router'
import SidebarMenu from './components/Sidebar'
function App() {
	return (
		<div style={{ height: '100vh' }}>
			<SidebarMenu />
			<>
				<Routes>
					<Route path='/map' element={<Map />} />
				</Routes>
			</>
		</div>
	)
}

export default App
