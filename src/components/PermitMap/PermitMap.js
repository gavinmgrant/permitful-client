import React, { useState, useRef, useCallback, useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
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

// loads in the map style from Snazzy Maps and removes the default Google Maps UI controls
const options = {
  styles: mapStyle,
  disableDefaultUI: true
}

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function PermitMap() {
  const context = useContext(PermitfulContext);

  // centers Google Maps and sets the city permit API URL based on the selected city
  let center, cityURL, queryParams;

  if (context.cityName === 'SFO') {
    center = {
      lat: 37.73572,
      lng: -122.431297
    };
    cityURL = 'https://data.sfgov.org/resource/i98e-djp9.json?$limit=';
    queryParams = '&$order=permit_creation_date DESC';
  } else if (context.cityName === 'LAX') {
    center = {
      lat: 34.0522,
      lng: -118.2437
    };
    cityURL = 'https://data.lacity.org/resource/yv23-pmwf.json?$limit=';
    queryParams = '&$order=status_date DESC';
  }
  
  // React Hooks that set the initial state for the external API permit data
  const [permitNumber, setPermitNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetSuffix, setStreetSuffix] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [permitDescription, setPermitDescription] = useState('');
  const [statusDate, setStatusDate] = useState('');
  const [permitStatus, setPermitStatus] = useState('');

  // Google Maps React Hook useLoadScript that tells you when the Google script is ready
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

  const url = cityURL + markerLimit + "&$$app_token=" + appToken + queryParams;
  const { data, error } = useSWR(url, fetcher);
  const permits = data && !error ? data : [];

  // gets address from search bar to control visibility of components below
  const [searchAddress, setSearchAddress] = useState('');
  const handleAddress = useCallback(addressState => {
    setSearchAddress(addressState);
  }, []);

  // if click outside of marker, set detail area (controlled by the status date) to default
  const handleClick = () => setStatusDate('');
  
  if (loadError) return "Error loading the map.";
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
          permit.location || permit.location_1
          ? (
              <Marker 
                key={context.cityName === 'SFO' ? permit.record_id : permit.pcis_permit}
                clickable={true}
                icon={{
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/240px-Map_marker_font_awesome.svg.png",
                  scaledSize: new window.google.maps.Size(32,32),
                }}
                onClick={() => {
                  setPermitNumber(context.cityName === 'SFO' ? permit.permit_number : permit.pcis_permit);
                  setStreetNumber(context.cityName === 'SFO' ? permit.street_number : permit.address_start);
                  setStreetName(permit.street_name);
                  setStreetSuffix(permit.street_suffix);
                  setUnitNumber(permit.unit);
                  setPermitDescription(context.cityName === 'SFO' ? permit.description : permit.work_description);
                  setStatusDate(permit.status_date);
                  setPermitStatus(context.cityName === 'SFO' ? permit.status : permit.latest_status);
                }}
                position={{ 
                  lat: context.cityName === 'SFO' ? permit.location.coordinates[1] : parseFloat(permit.location_1.latitude),
                  lng: context.cityName === 'SFO' ? permit.location.coordinates[0] : parseFloat(permit.location_1.longitude) 
                }}
                opacity={0.5}
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