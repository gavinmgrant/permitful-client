import React from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { mapStyle } from './MapStyle';
import SearchBar from '../SearchBar/SearchBar';
import '@reach/combobox/styles.css';

const libraries = ["places"];
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 37.773972,
  lng: -122.431297
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true
}

export default function PermitMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });    
  const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <SearchBar getPanTo={panTo}/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={options}
        onLoad={onMapLoad}
      >
      </GoogleMap>
    </div>
  );
}