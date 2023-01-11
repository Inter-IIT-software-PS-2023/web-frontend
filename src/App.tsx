import './App.css'
import Map from './components/Map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>

					<Route path='/' element={<Map />}></Route>
				</Routes>
			</BrowserRouter></>

	)
}

export default App
