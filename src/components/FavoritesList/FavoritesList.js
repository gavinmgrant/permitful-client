import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from "swr";
import config from '../../config';
import TokenService from '../../services/token-service';
import FavoritesItem from '../FavoritesItem/FavoritesItem';
import './FavoritesList.css';

// provides auth token for SWR React Hook below
const fetcher = url => fetch(url, {
    headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
    }
}).then(r => r.json())

export default function FavoritesList() {
    // get saved favorite permit numbers from the server
    const url = `${config.API_ENDPOINT}/favorites`;
    const { data, error } = useSWR(url, fetcher);
    const favorites = data && !error ? data : [];
    
    return (
        <div className='favorites-list'>
            <h2>Favorites</h2>
            <ul>
                {favorites.map(favorite => 
                    <li 
                        key={favorite.id}
                        className="favorite-permit-li"
                    >
                        <FavoritesItem 
                            permit_number={favorite.permit_number}
                        />
                    </li>)}
            </ul>
            <Link to="/map">
                <button className="restart-button">Start new search</button>
            </Link>
        </div>
    );
}