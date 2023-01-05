import React, { useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import '../styles/MapDisplay.css'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '../styles/Marker.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
const Map = () => {
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
      style: 'mapbox://styles/mapbox/streets-v11',
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