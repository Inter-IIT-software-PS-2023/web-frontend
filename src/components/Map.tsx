/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/MapDisplay.css'
import '../styles/Marker.css'
import mapboxgl from 'mapbox-gl'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import RiderModal from './RiderModal'
import { Theme } from '../store/features/themeToggle/ToggleTheme'
import { useAppSelector } from '../store/app/Hooks'
import { riderSelector } from '../store/features/Rider'
import { updateRoute } from '../services/mapServices'
import { themeSelector } from '../store/features/themeToggle/Toggle'
import { colors } from '../utils/colors'
import SideBarModule from './SideBarModule'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InventoryIcon from '@mui/icons-material/Inventory'
import '../styles/Popper.css'
import { Button } from '@mui/material'
const Map = () => {
	const map: any = useRef(null)
	const mapContainer = useRef<HTMLDivElement>(null)
	const [marker, setMarker] = useState<any>(null)
	const [mapState, setMap] = useState<any>(null)
	const [lat] = useState(77.5946)
	const [lng] = useState(12.9716)
	const [zoom] = useState(15)
	const theme = useAppSelector(themeSelector)
	const currentRider = useAppSelector(riderSelector).currentRider
	const riders = useAppSelector(riderSelector).rider
	console.log(riders)
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen(!open)
	}
	const setMarkers = (Riders = riders) => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: theme,
			center: [lat, lng],
			zoom: zoom,
		})
		Riders?.forEach((rider: any, index: number) => {
			rider.package.forEach((packag: any) => {
				new mapboxgl.Marker({ color: colors[index] })
					.setLngLat([packag.lng, packag.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
							.setHTML(
								`<div style=background-color:white;width:150px;height:100px>
								<h4 style=text-align:center>Name : ${packag.product_id}</h4>
								<div style=text-align:center >${packag.customer_name} </div>
								<div style=text-align:center >Latitude: ${packag.lat} </div>
								<div style=text-align:center >Longitude: ${packag.lng} </div>
								</div>`
							)
					)
					.addTo(map.current)
			})
			const el = document.createElement('div')
			el.className = 'marker'
			el.classList.add('marker')
			const marker = new mapboxgl.Marker(el)
				.setLngLat([rider.position.lng, rider.position.lat])
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }) // add popups
						.setHTML(
							`<div style=background-color:white;width:150px;height:100px >
								<h4 style=text-align:center>Name : ${rider.name}</h4>
								<div style=text-align:center >Package delivered: ${rider.package.length} </div>
								<div style=text-align:center >Package left: 0 </div>
								<div style=text-align:center >Latitude: ${rider.position.lat} </div>
								<div style=text-align:center >Longitude: ${rider.position.lng} </div>
								</div>	`
						)
				)
				.addTo(map.current)
			setMarker(marker)
		})

		const search = new MapBoxGeocoder({
			accessToken: mapboxgl.accessToken,
			marker: false,
			mapboxgl: mapboxgl,
			collapsed: true,
		})

		// Actions on map
		map.current.addControl(search, 'top-right')
		map.current.addControl(new mapboxgl.NavigationControl())
		// map.current.addControl(draw)
		map.current.on('draw.create', updateRoute)
		map.current.on('draw.update', updateRoute)
		setMap(map.current)
	}

	useEffect(() => {
		if (currentRider.length === 0) {
			setMarkers()
			return
		}
		setMarkers(currentRider)
	}, [currentRider, theme])

	return (
		<>
			<SideBarModule />
			<div className='theme'>
				<Theme />
			</div>
			<div>
				<div
					ref={mapContainer}
					className='map.current-container'
					style={{ height: '100vh', width: '100vw' }}
				/>
				<Button
					variant='contained'
					sx={{
						borderRadius: '50%',
						height: '60px',
						position: 'absolute',
						bottom: '10px',
						right: '0',
						zIndex: '3',
						backgroundColor: 'white',
						color: 'black',
						boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
						'&:hover': {
							backgroundColor: 'white',
							boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
						},
					}}
					onClick={() => {
						if (currentRider.length === 0) {
							alert('Please select a rider')
							return
						}
						updateRoute(currentRider[0], mapState, marker)
					}}
				>
					<PlayArrowIcon />
				</Button>
				<Button
					variant='contained'
					sx={{
						borderRadius: '50%',
						height: '60px',
						position: 'absolute',
						bottom: '90px',
						right: '0',
						zIndex: '3',
						backgroundColor: 'white',
						color: 'black',
						boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
						'&:hover': {
							backgroundColor: 'white',
							boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
						},
					}}
					onClick={() => handleClose()}
				>
					<InventoryIcon />
				</Button>
			</div>
			<div>
				<RiderModal open={open} handleClose={handleClose} />
			</div>
		</>
	)
}

export default Map
