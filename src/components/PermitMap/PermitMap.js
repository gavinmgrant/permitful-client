import React, { useState, useRef, useCallback } from 'react';
import { Marker, useLoadScript, GoogleMap } from '@react-google-maps/api';
import useSWR from "swr";
import { mapStyle } from './MapStyle';
import SearchBar from '../SearchBar/SearchBar';
import Details from '../Details/Details';
import '@reach/combobox/styles.css';

const libraries = ["places"];
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 37.73572,
  lng: -122.431297
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true
}

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function PermitMap() {
  const [permitNumber, setPermitNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetSuffix, setStreetSuffix] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [permitDescription, setPermitDescription] = useState('');
  const [statusDate, setStatusDate] = useState('');
  const [permitStatus, setPermitStatus] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  // gets marker limit amount from search bar
  const [markerLimit, setMarkerLimit] = useState(100);
  const handleMarkerLimit = useCallback(markerState => {
    setMarkerLimit(markerState);
  }, []);

  const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;

  const url = "https://data.sfgov.org/resource/i98e-djp9.json?$limit=" + markerLimit + "&$$app_token=" + appToken + "&$order=permit_creation_date DESC";
  const { data, error } = useSWR(url, fetcher);
  const permits = data && !error ? data : [];

  // gets address from search bar to control visibility of components below
  const [searchAddress, setSearchAddress] = useState('');
  const handleAddress = useCallback(addressState => {
    setSearchAddress(addressState);
  }, []);

  // if click outside of marker, set detail area (controlled by the status date) to default
  const handleClick = () => setStatusDate('');
  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading the map...";

  return (
    <div id='permit-map' className='permit-map'>
      <SearchBar 
        getPanTo={panTo}
        handleAddress={handleAddress}
        handleMarkerLimit={handleMarkerLimit}
      />
      {!searchAddress ? <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={options}
        onLoad={onMapLoad}
        onClick={handleClick}
      >
        {permits.map(permit => (
          permit.location
          ? (
              <Marker 
                key={permit.record_id}
                clickable={true}
                onClick={() => {
                  setPermitNumber(permit.permit_number);
                  setStreetNumber(permit.street_number);
                  setStreetName(permit.street_name);
                  setStreetSuffix(permit.street_suffix);
                  setUnitNumber(permit.unit);
                  setPermitDescription(permit.description);
                  setStatusDate(permit.status_date);
                  setPermitStatus(permit.status);
                }}
                position={{ lat: parseFloat(permit.location.latitude),
                  lng: parseFloat(permit.location.longitude) }} 
              />
          ) : ''
        ))}
      </GoogleMap> : ''}
      {!searchAddress ? 
      <Details
        permitNumber={permitNumber} 
        streetNumber={streetNumber}
        streetName={streetName}
        streetSuffix={streetSuffix}
        unitNumber={unitNumber}
        permitDescription={permitDescription}
        statusDate={statusDate}
        permitStatus={permitStatus}
      /> : ''}
    </div>
  );
}