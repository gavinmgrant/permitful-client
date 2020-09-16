import React from 'react';
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
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
          } catch(error) {
            console.log("Combobox error!");
          }

          console.log(address);
        }}
      >
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
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} /> 
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox> 
    </div>
  ); 
}