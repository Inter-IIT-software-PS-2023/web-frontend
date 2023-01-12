import Map from './components/Map'
import { Route, Routes } from 'react-router'
import SidebarMenu from './components/Sidebar'
import Csv from './components/Csv';
import "./styles/Sidebar.css"
function App() {
	return (
		<div style={{ height: '100vh', display: "flex" }}>
			<div className='sidebar'><SidebarMenu /></div>


			<Routes>
				<Route path='/map' element={<Map />} />
				<Route path='/csv' element={<Csv />}></Route>
			</Routes>

		</div>
	)
}

export default App
