import React from 'react';
import useSWR from "swr";
import './Results.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

function refreshPage() {
    window.location.reload(false);
}

export default function Results(props) {
    const address = props.searchAddress;
    const addressArr = address.split(' ');
    const addressNum = addressArr[0];
    const addressName = addressArr[1];
    const addressSuffix = addressArr[2].slice(0, -1);

    const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;

    const url = "https://data.sfgov.org/resource/i98e-djp9.json?street_number=" + addressNum + "&street_name=" + addressName + "&$$app_token=" + appToken + "&$order=status_date DESC";
    const { data, error } = useSWR(url, fetcher);
    const results = data && !error ? data : [];
    const searchResults = results.map(result => 
        <details key={result.record_id} className="results-item">
            <summary><span className="underline">Status Date:</span> {result.status_date.slice(0, 10)}</summary>
            <div className="results-details">
                <p><span className="underline">Permit Number:</span> {result.permit_number}</p>
                <p><span className="underline">Permit Status:</span> {result.status}</p>
                <p><span className="underline">Description:</span> {result.description}</p>
            </div>
        </details>
    );

    return (
        <div className="results">
            {searchResults.length > 20 ? <button onClick={refreshPage} className="restart-button">Start new search</button> : ''}
            <h2>Permits for {addressNum} {addressName} {addressSuffix}</h2>
            {searchResults.length > 0 ? searchResults : <p>No permits found for this address.</p>}
            <button onClick={refreshPage} className="restart-button">Start new search</button>
        </div>
    )
}