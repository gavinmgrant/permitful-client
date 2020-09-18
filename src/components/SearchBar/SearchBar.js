import React, { useState, useEffect } from 'react';
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import Results from '../Results/Results';
import '@reach/combobox/styles.css';
import './SearchBar.css'

export default function SearchBar(props) {
  const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 37.773972, lng: () => -122.431297 },
      radius: 200 * 1000,
    },
  });

  const panTo = props.getPanTo;

  // sends search address to parent, permit map
  const [searchAddress, setSearchAddress] = useState('');
  const handleAdd = props.handleAddress;
  useEffect(() => {
    handleAdd(searchAddress);
  }, [searchAddress, handleAdd]);

  // sends marker limit amount to parent, permit map
  const [markerLimit, setMarkerLimit] = useState(100);
  const handleLimit = props.handleMarkerLimit;
  useEffect(() => {
    handleLimit(markerLimit);
  }, [markerLimit, handleLimit]);
  console.log('search limit: ', markerLimit)

  return (
    <div className="search">
      <Combobox 
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({address});
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            setSearchAddress(address);
          } catch(error) {
            console.log("Combobox error!");
          }
        }}
      >
        <div className="search-input">
          <ComboboxInput 
            value={value} 
            onChange={(e) => {
              setValue(e.target.value);
            }} 
            disabled={!ready}
            placeholder="Search by address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" && 
                data.map(({ description }) => (
                  <ComboboxOption key={description} value={description} /> 
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </div>
      </Combobox> 
      <div className="limit-input">
        <input type="text" pattern="[1-2000]*" id="limit" name="limit" placeholder="100 markers"
          onChange={e => {
            setMarkerLimit(e.target.value);
          }}
        /> 
      </div>
      {!searchAddress ? <div></div> :
        <div>
          <Results searchAddress = {searchAddress}/>
        </div> 
      }
    </div>
  ); 
}