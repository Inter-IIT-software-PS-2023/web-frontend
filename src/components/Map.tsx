import React, { useRef, useState } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import '../styles/MapDisplay.css'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '../styles/Marker.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxDraw from "@mapbox/mapbox-gl-draw";

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

    const draw = new MapboxDraw({
      // Instead of showing all the draw tools, show only the line string and delete tools
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      // Set the draw mode to draw LineStrings by default
      defaultMode: 'draw_line_string',
      styles: [
        // Set the line style for the user-input coordinates
        {
          'id': 'gl-draw-line',
          'type': 'line',
          'filter': [
            'all',
            ['==', '$type', 'LineString'],
            ['!=', 'mode', 'static']
          ],
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#438EE4',
            'line-dasharray': [0.2, 2],
            'line-width': 2,
            'line-opacity': 0.7
          }
        },
        // Style the vertex point halos
        {
          'id': 'gl-draw-polygon-and-line-vertex-halo-active',
          'type': 'circle',
          'filter': [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static']
          ],
          'paint': {
            'circle-radius': 12,
            'circle-color': '#FFF'
          }
        },
        // Style the vertex points
        {
          'id': 'gl-draw-polygon-and-line-vertex-active',
          'type': 'circle',
          'filter': [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static']
          ],
          'paint': {
            'circle-radius': 8,
            'circle-color': '#438EE4'
          }
        }
      ]
    });

    // Add the draw tool to the map.current
    map.current.addControl(draw);

    // Add create, update, or delete actions
    map.current.on('draw.create', updateRoute);
    map.current.on('draw.update', updateRoute);
    map.current.on('draw.delete', removeRoute);

    // Use the coordinates you just drew to make the Map Matching API request
    function updateRoute() {
      removeRoute(); // Overwrite any existing layers

      const profile = 'driving'; // Set the profile

      // Get the coordinates
      const data = draw.getAll();
      const lastFeature = data.features.length - 1;
      const coords = (data.features[lastFeature].geometry as any).coordinates;
      console.log(coords)
      // Format the coordinates
      const newCoords = coords.join(';');
      // Set the radius for each coordinate pair to 25 meters
      const radius = coords.map(() => 25);
      getMatch(newCoords, radius, profile);
    }

    // Make a Map Matching request
    async function getMatch(coordinates: any, radius: any[], profile: string) {
      // Separate the radiuses with semicolons
      const radiuses = radius.join(';');
      // Create the query
      const query = await fetch(
        `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const response = await query.json();
      // Handle errors
      if (response.code !== 'Ok') {
        alert(
          `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map.current-matching/#map.current-matching-api-errors`
        );
        return;
      }
      const coords = response.matchings[0].geometry;
      // Draw the route on the map.current
      addRoute(coords);
      getInstructions(response.matchings[0]);
    }

    function getInstructions(data: { legs: any; duration: number; }) {
      // Target the sidebar to add the instructions
      const directions = document.getElementById('directions');
      let tripDirections = '';
      // Output the instructions for each step of each leg in the response object
      for (const leg of data.legs) {
        const steps = leg.steps;
        for (const step of steps) {
          tripDirections += `<li>${step.maneuver.instruction}</li>`;
        }
      }
      directions!.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min.</strong></p><ol>${tripDirections}</ol>`;
    }

    // Draw the Map Matching route as a new layer on the map.current
    function addRoute(coords: any) {
      // If a route is already loaded, remove it
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      } else {
        map.current.addLayer({
          'id': 'route',
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': coords
            }
          },
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#03AA46',
            'line-width': 8,
            'line-opacity': 0.8
          }
        });
      }
    }

    // If the user clicks the delete draw button, remove the layer if it exists
    function removeRoute() {
      if (!map.current.getSource('route')) return;
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    map.current.on('draw.delete', removeRoute);
    // Make a Map Matching request


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
        <div ref={mapContainer} className='map.current-container' style={{ height: '100vh' }} > <div className="info-box">
          <p>
            Draw your route using the draw tools on the right. To get the most
            accurate route match, draw points at regular intervals.
          </p>
          <div id="directions"></div>
        </div></div>
      </div>
    </>
  )
}

export default Map