/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/MapDisplay.css'
import '../styles/Marker.css'
import { Button } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { length, along } from '@turf/turf'
import { addRoute, draw, getInstructions } from '../services/mapServices'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
const Map = () => {
	const map: any = useRef(null)
	const [open, setOpen] = useState(false)
	const handleModal = () => setOpen(!open)
	const mapContainer = useRef<HTMLDivElement>(null)
	const directionContainer = useRef<HTMLDivElement>(null)
	const [lat, setLat] = useState(80.3319)
	const [lng, setLng] = useState(26.4499)
	const [zoom, setZoom] = useState(15)
	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
		if (map.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lat, lng],
			zoom: zoom,
		})
		if (!map.current) return
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(map.current.getZoom().toFixed(2))
		})
		const search = new MapBoxGeocoder({
			accessToken: mapboxgl.accessToken,
			marker: false,
			mapboxgl: mapboxgl,
			collapsed: true,
		})

		// Rider Marker
		const el = document.createElement('div')
		el.className = 'marker'
		el.classList.add('marker')
		const marker = new mapboxgl.Marker(el)

		function updateRoute() {
			removeRoute()
			const profile = 'driving'
			const data = draw.getAll()
			const lastFeature = data.features.length - 1
			const coords = (data.features[lastFeature].geometry as any).coordinates
			const newCoords = coords.join(';')
			const radius = coords.map(() => 20)
			getMatch(newCoords, radius, profile)
		}
		async function getMatch(coordinates: any, radius: any[], profile: string) {
			const radiuses = radius.join(';')
			const query = await fetch(
				`https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`
			)
			const response = await query.json()
			if (response.code !== 'Ok') {
				alert('No roads avaiable')
				return
			}
			const coords = response.matchings[0].geometry
			console.log(response.matchings[0])
			getInstructions(response.matchings[0], directionContainer.current)
			// animation for marker motion
			const route = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'LineString',
							coordinates: coords.coordinates,
						},
					},
				],
			}
			const lineDistance = length(route.features[0] as any)
			const arc = []
			const steps = 500
			for (let i = 0; i < lineDistance; i += lineDistance / steps) {
				const segment = along(route.features[0] as any, i)
				arc.push(segment.geometry.coordinates)
			}
			route.features[0].geometry.coordinates = arc
			let counter = 0
			addRoute(map.current, coords)
			fitMap(map.current, coords.coordinates)
			marker
				.setLngLat(route.features[0].geometry.coordinates[0])
				.addTo(map.current)
			function animate() {
				marker.setLngLat(route.features[0].geometry.coordinates[counter])
				counter = counter + 1
				if (counter < steps) {
					requestAnimationFrame(animate)
				} else {
					alert('Destination reached')
				}
			}
			requestAnimationFrame(animate)
			function fitMap(map: any, coords: any) {
				const bounds = coords.reduce(function (
					bounds: { extend: (arg0: any) => any },
					coord: any
				) {
					return bounds.extend(coord)
				},
				new mapboxgl.LngLatBounds(coords[0], coords[0]))
				map.fitBounds(bounds, {
					padding: 30,
				})
			}
		}

		function removeRoute() {
			if (!map.current.getSource('route')) return
			map.current.removeLayer('route')
			map.current.removeSource('route')
		}

		// Actions on map
		map.current.addControl(search, 'top-right')
		map.current.addControl(new mapboxgl.NavigationControl())
		map.current.addControl(draw)
		map.current.on('draw.create', updateRoute)
		map.current.on('draw.update', updateRoute)
		map.current.on('draw.delete', removeRoute)
	})
	return (
		<>
			<div>
				<div
					ref={mapContainer}
					className='map.current-container'
					style={{ height: '100vh' }}
				>
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
						onClick={handleModal}
					>
						<LightbulbIcon />
					</Button>
					<div className='info-box'>
						<div ref={directionContainer}></div>
					</div>
				</div>
			</div>
			{/* <DrivingModal open={open} handleModal={handleModal} /> */}
		</>
	)
}

export default Map
