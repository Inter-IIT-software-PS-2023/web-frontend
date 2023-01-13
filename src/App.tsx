import Map from './components/Map'
import { Route, Routes } from 'react-router'
import SidebarMenu from './components/Sidebar'
import Csv from './components/Csv';
import "./styles/Sidebar.css"
import "./styles/Rider.css"
import SideBarModule from './components/SideBarModule';
function App() {
	return (
		<div style={{ height: '100vh', display: "flex" }}>
			<SideBarModule />

			<Routes>
				<Route path='/map' element={<Map />} />
				<Route path='/csv' element={<Csv />}></Route>
			</Routes>

		</div>
	)
}

export default App
