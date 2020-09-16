import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { mapStyle } from './MapStyle';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 37.773972,
  lng: -122.431297
};

const options = {
  styles: mapStyle
}

export default class PermitMap extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={options}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}