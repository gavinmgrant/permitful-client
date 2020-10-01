import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import useSWR from "swr";
import { HeartSolid, HeartOutline } from '../../utils/Icons';
import './Results.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

function refreshPage() {
    window.location.reload(false);
}

export default function Results(props) {
    const context = useContext(PermitfulContext);

    // posts new favorite to server
    const handleFavorite = (num) => {
        const favorited = {
            permit_number: num,
            user_id: context.userId
        }
        fetch(`${config.API_ENDPOINT}/favorites`, {
            method: 'POST',
            body: JSON.stringify(favorited),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
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

    // fetches permits from the external API using the SWR React Hook
    const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;
    const url = "https://data.sfgov.org/resource/i98e-djp9.json?street_number=" + addressNum + "&street_name=" + addressName + "&$$app_token=" + appToken + "&$order=status_date DESC";
    const { data, error } = useSWR(url, fetcher);
    const results = data && !error ? data : [];

    // checks if the current permit selected is in the favorites list
    const checkIfFavorite = (current) => {
        const isFavorite = (favorite) => favorite === current;
        const favs = context.favorites.map(({ permit_number }) => permit_number)
        console.log(favs);
        return favs.some(isFavorite);
    };

    // returns a new array of the permits for the subject property
    const searchResults = results.map(result => 
        <details key={result.record_id} className="results-item">
            <summary>
                <h3>
                    <span className="bold">Permit Number</span>: {result.permit_number}
                </h3>
            </summary>
            <div className="results-details">
                <p><span className="bold">Status Date: </span>{result.status_date.slice(0, 10)}</p>
                <p><span className="bold">Status: </span>{result.status}</p>
                <p><span className="bold">Description: </span>{result.description}</p>
                {TokenService.hasAuthToken() ?
                    <button 
                        disabled={checkIfFavorite(result.permit_number)}
                        onClick={() => handleFavorite(result.permit_number)}
                        className="heart-button"
                    >
                        {!checkIfFavorite(result.permit_number) ? HeartOutline : HeartSolid}
                    </button> : ''}                   
            </div>
        </details>
    );
    
    return (
        <div className="results">
            <h1>{addressNum} {addressName} {addressSuffix}</h1>
            {searchResults.length > 0 ? searchResults : <p>No permits found for this address.</p>}
            <button onClick={refreshPage} className="restart-button">Start new search</button>
        </div>
    )
}