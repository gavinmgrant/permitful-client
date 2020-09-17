import React, { useState } from 'react';
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
  const [searchAddress, setSearchAddress] = useState('');

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
            placeholder="Search permits by address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" && 
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} /> 
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </div>
      </Combobox> 
      
      {!searchAddress ? <div></div> :
        <div>
          <Results searchAddress = {searchAddress}/>
        </div> 
      }
    </div>
  ); 
}