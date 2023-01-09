/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/MapDisplay.css'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '../styles/Marker.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { length, along } from '@turf/turf'
import { Theme } from '../store/features/themeToggle/ToggleTheme'
// import sessionStorage from 'redux-persist/es/storage/session'
const Map = () => {
	// const MapboxDirections = require('@mapbox/mapbox-gl-directions');
	const map: any = useRef(null)
	const mapContainer = useRef<HTMLDivElement>(null)
	const [lat, setLat] = useState(80.3319)
	const [lng, setLng] = useState(26.4499)
	const [zoom, setZoom] = useState(15)
	const [theme, setTheme] = useState(JSON.parse(sessionStorage.getItem("persist:root")!)?.value)
	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
		const url = JSON.parse(sessionStorage.getItem("persist:root")!)?.value;
		if (map.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: theme,
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

		// const marker = new mapboxgl.Marker({
		// 	color: '#011f4b',
		// })
		const el = document.createElement('div')
		el.className = 'marker'
		el.classList.add('marker')
		// make a marker for each feature and add to the map
		const marker = new mapboxgl.Marker(el)

		const draw = new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				line_string: true,
				trash: true,
			},
			defaultMode: 'draw_line_string',
			styles: [
				{
					id: 'gl-draw-line',
					type: 'line',
					filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
					layout: {
						'line-cap': 'round',
						'line-join': 'round',
					},
					paint: {
						'line-color': '#011f4b',
						'line-dasharray': [0.2, 2],
						'line-width': 2,
						'line-opacity': 0.7,
					},
				},
				{
					id: 'gl-draw-polygon-and-line-vertex-halo-active',
					type: 'circle',
					filter: [
						'all',
						['==', 'meta', 'vertex'],
						['==', '$type', 'Point'],
						['!=', 'mode', 'static'],
					],
					paint: {
						'circle-radius': 12,
						'circle-color': '#FFF',
					},
				},
				{
					id: 'gl-draw-polygon-and-line-vertex-active',
					type: 'circle',
					filter: [
						'all',
						['==', 'meta', 'vertex'],
						['==', '$type', 'Point'],
						['!=', 'mode', 'static'],
					],
					paint: {
						'circle-radius': 8,
						'circle-color': '#011f4b',
					},
				},
			],
		})

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
			console.log(coords)
			// getInstructions(response.matchings[0])
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
			addRoute(coords)
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

		// function getInstructions(data: { legs: any; duration: number }) {
		// 	const directions = document.getElementById('directions')
		// 	let tripDirections = ''
		// 	for (const leg of data.legs) {
		// 		const steps = leg.steps
		// 		for (const step of steps) {
		// 			tripDirections += `<li>${step.maneuver.instruction}</li>`
		// 		}
		// 	}
		// 	directions!.innerHTML = `<p><strong>Trip duration: ${Math.floor(
		// 		data.duration / 60
		// 	)} min.</strong></p><ol>${tripDirections}</ol>`
		// }

		function addRoute(coords: any) {
			if (map.current.getSource('route')) {
				map.current.removeLayer('route')
				map.current.removeSource('route')
			} else {
				map.current.addLayer({
					id: 'route',
					type: 'line',
					source: {
						type: 'geojson',
						data: {
							type: 'Feature',
							properties: {},
							geometry: coords,
						},
					},
					layout: {
						'line-join': 'round',
						'line-cap': 'round',
					},
					paint: {
						'line-color': '#011f4b',
						'line-width': 8,
						'line-opacity': 0.8,
					},
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
	}, [theme]);

	return (
		<>
			<div className='theme' onClick={() => {
				setTheme(JSON.parse(sessionStorage.getItem("persist:root")!)?.value)
				console.log(typeof JSON.parse(sessionStorage.getItem("persist:root")!)?.value)
			}}><Theme /></div>
			<div style={{ maxHeight: 'calc(100vh)', overflow: 'hidden' }}>
				<div
					ref={mapContainer}
					className='map.current-container'
					style={{ height: '100vh' }}
				>

					{/* <div className='info-box'>
						<p>
							Draw your route using the draw tools on the right. To get the most
							accurate route match, draw points at regular intervals.
						</p>
						<div id='directions'></div>
					</div> */}
				</div>
			</div>
		</>
	)
}

export default Map
