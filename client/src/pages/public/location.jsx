import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    let map;
    const loader = new Loader({
      apiKey: '',
      version: 'weekly',
    });

    const initMap = async () => {
      const { Map } = await loader.load();
      console.log('Map object:', Map); // <-- add this line
      map = new Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      setMap(map);
    };

    initMap();

    // Clean up
    return () => {
      if (map) {
        map.dispose();
        setMap(null);
      }
    };
  }, []);

  return (
    <div>
      <h1>Our Location</h1>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default Map;
