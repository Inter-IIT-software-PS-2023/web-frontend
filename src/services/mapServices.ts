import MapboxDraw from '@mapbox/mapbox-gl-draw'

/* eslint-disable @typescript-eslint/no-explicit-any */
const addRoute = (map: any, coords: any) => {
	if (map.getSource('route')) {
		map.removeLayer('route')
		map.removeSource('route')
	} else {
		map.addLayer({
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

const getInstructions = (
	data: { legs: any; duration: number },
	directions: any
) => {
	let tripDirections = ''
	for (const leg of data.legs) {
		const steps = leg.steps
		for (const step of steps) {
			tripDirections += `<li>${step.maneuver.instruction}</li>`
		}
	}
	directions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
		data.duration / 60
	)} min.</strong></p><ol>${tripDirections}</ol>`
}

export { addRoute, draw, getInstructions }
