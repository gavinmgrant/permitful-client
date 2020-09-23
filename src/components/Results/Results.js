import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import useSWR from "swr";
import './Results.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

function refreshPage() {
    window.location.reload(false);
}

export default function Results(props) {
    const context = useContext(PermitfulContext);

    const handleFavorite = (num) => {
        const favorited = {
            permit_number: num
        }
        fetch(`${config.API_ENDPOINT}/favorites`, {
            method: 'POST',
            body: JSON.stringify(favorited),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            context.addFavorite({...data, favorited})
        })
        .catch(error => {
            console.error({ error });
        })
    }

    const address = props.searchAddress;
    const addressArr = address.split(' ');
    const addressNum = addressArr[0];
    const addressName = addressArr[1];
    const addressSuffix = addressArr[2].slice(0, -1);

    const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;

    const url = "https://data.sfgov.org/resource/i98e-djp9.json?street_number=" + addressNum + "&street_name=" + addressName + "&$$app_token=" + appToken + "&$order=status_date DESC";
    const { data, error } = useSWR(url, fetcher);
    const results = data && !error ? data : [];

    const checkIfFavorite = (current) => {
        const isFavorite = (favorite) => favorite === current;
        const favs = context.favorites.map(( { permit_number }) => permit_number)
        return favs.some(isFavorite);
    };

    const searchResults = results.map(result => 
        <details key={result.record_id} className="results-item">
            <summary>
                <h3>
                    <span className="underline">Permit Number</span>: {result.permit_number}
                </h3>
            </summary>
            <div className="results-details">
                <p><span className="underline">Status Date: </span>{result.status_date.slice(0, 10)}</p>
                <p><span className="underline">Status: </span>{result.status}</p>
                <p><span className="underline">Description: </span>{result.description}</p>
                <button 
                    disabled={checkIfFavorite(result.permit_number)}
                    onClick={() => handleFavorite(result.permit_number)}
                >
                    {!checkIfFavorite(result.permit_number) ? 'Add to favorites' : 'Favorited'}
                </button>                   
            </div>
        </details>
    );
    
    return (
        <div className="results">
            <h2>Permits for {addressNum} {addressName} {addressSuffix}</h2>
            {searchResults.length > 0 ? searchResults : <p>No permits found for this address.</p>}
            <button onClick={refreshPage} className="restart-button">Start new search</button>
        </div>
    )
}