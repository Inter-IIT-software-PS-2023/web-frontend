/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
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
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen(!open)
	}
	const setMarkers = (Riders = riders) => {
		console.log(Riders)
		mapboxgl.accessToken =
			'pk.eyJ1IjoiaXNodTExNDQwNyIsImEiOiJjbGNpcHdqdjkwMnplM29xbXJjdXRoM3hiIn0.7bDoT4N8RAglxqUzf8lKvg'
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: theme,
			center: [lat, lng],
			zoom: zoom,
		})
		Riders?.forEach((rider: any, index: number) => {
			rider.order.forEach((packag: any) => {
				new mapboxgl.Marker({ color: colors[index] })
					.setLngLat([packag?.address.lng, packag?.address.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
							.setHTML(
								`<div style=background-color:white;width:150px;height:100px>
								<h4 style=text-align:center>Name : ${packag.productId}</h4>
								<div style=text-align:center >${packag.name} </div>
								<div style=text-align:center >Latitude: ${packag.address.lat} </div>
								<div style=text-align:center >Longitude: ${packag.address.lng} </div>
								</div>`
							)
					)
					.addTo(map.current)
			})
			if (rider.order.length > 0) {
				const el = document.createElement('div')
				el.className = 'marker'
				el.classList.add('marker')
				const marker = new mapboxgl.Marker(el)
					.setLngLat([rider.order[0]?.address.lng, rider.order[0]?.address.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
							.setHTML(
								`<div style=background-color:white;width:150px;height:100px >
									<h4 style=text-align:center>Name : ${rider.rider.username}</h4>
									<div style=text-align:center >Package delivered: ${rider.order.length} </div>
									<div style=text-align:center >Package left: 0 </div>
									<div style=text-align:center >Latitude: ${rider.order[0].address.lat} </div>
									<div style=text-align:center >Longitude: ${rider.order[0].address.lng} </div>
									</div>	`
							)
					)
					.addTo(map.current)
				setMarker(marker)
			}
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
		// map.current.on('draw.create', updateRoute)
		// map.current.on('draw.update', updateRoute)
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
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '60px',
					right: '0',
					zIndex: '99999',
				}}
			>
				<Button
					variant='contained'
					sx={{
						borderRadius: '50%',
						height: '60px',
						backgroundColor: 'white',
						color: 'black',
						marginRight: '3px',
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
						backgroundColor: 'white',
						color: 'black',
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
