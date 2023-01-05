import React, { useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import '../styles/MapDisplay.css'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '../styles/Marker.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const Map = () => {
  // var MapboxDirections = require('@mapbox/mapbox-gl-directions');
  const map: any = useRef(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lat, setLat] = useState(77.1025);
  const [lng, setLng] = useState(28.7041)
  const [zoom, setZoom] = useState(5)
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
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
    map.current.addControl(search, 'top-right')
    map.current.addControl(new mapboxgl.NavigationControl())

    map.current.on('load', () => {
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [-122.483696, 37.833818],
              [-122.483482, 37.833174],
              [-122.483396, 37.8327],
              [-122.483568, 37.832056],
              [-122.48404, 37.831141],
              [-122.48404, 37.830497],
              [-122.483482, 37.82992],
              [-122.483568, 37.829548],
              [-122.48507, 37.829446],
              [-122.4861, 37.828802],
              [-122.486958, 37.82931],
              [-122.487001, 37.830802],
              [-122.487516, 37.831683],
              [-122.488031, 37.832158],
              [-122.488889, 37.832971],
              [-122.489876, 37.832632],
              [-122.490434, 37.832937],
              [-122.49125, 37.832429],
              [-122.491636, 37.832564],
              [-122.492237, 37.833378],
              [-122.493782, 37.833683]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#011F5B',
          'line-width': 8
        }
      });
    });

    // // San Francisco
    // var origin = [-122.414, 37.776];

    // // Washington DC
    // var destination = [-77.032, 38.913];

    // // A simple line from origin to destination.
    // var route = {
    //   'type': 'FeatureCollection',
    //   'features': [
    //     {
    //       'type': 'Feature',
    //       'geometry': {
    //         'type': 'LineString',
    //         'coordinates': [origin, destination]
    //       }
    //     }
    //   ]
    // };

    // map.current.on('load', function () {
    //   // Add a source and layer displaying a point which will be animated in a circle.
    //   map.current.addSource('route', {
    //     'type': 'geojson',
    //     'data': route
    //   });

    //   map.current.addLayer({
    //     'id': 'route',
    //     'source': 'route',
    //     'type': 'line',
    //     'paint': {
    //       'line-width': 2,
    //       'line-color': '#007cbf'
    //     }
    //   });

    // });
  })
  return (
    <>
      <div style={{ maxHeight: 'calc(100vh)', overflow: 'hidden' }}>
        <div ref={mapContainer} className='map-container' style={{ height: '100vh' }} />
      </div>
    </>
  )
}

export default Map