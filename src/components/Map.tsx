/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/MapDisplay.css'
import '../styles/Marker.css'
import mapboxgl from 'mapbox-gl'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { Theme } from '../store/features/themeToggle/ToggleTheme'
import { useAppSelector } from '../store/app/Hooks'
import { riderSelector } from '../store/features/Rider'
import { updateRoute } from '../services/mapServices'
import { themeSelector } from '../store/features/themeToggle/Toggle'
import { colors } from '../utils/colors'
import SideBarModule from './SideBarModule'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
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

	const setMarkers = (Riders = riders) => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: theme,
			center: [lat, lng],
			zoom: zoom,
		})
		riders.forEach((rider: any, index: number) => {
			rider.package.forEach((packag: any) => {
				new mapboxgl.Marker({ color: colors[index] })
					.setLngLat([packag.lng, packag.lat])
					.addTo(map.current)
			})
			const el = document.createElement('div')
			el.className = 'marker'
			el.classList.add('marker')
			const marker = new mapboxgl.Marker(el)
				.setLngLat([rider.position.lng, rider.position.lat])
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
		console.log(map.current)
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
			</div>
		</>
	)
}

export default Map
