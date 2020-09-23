import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from "swr";
import config from '../../config';
import FavoritesItem from '../FavoritesItem/FavoritesItem';
import './FavoritesList.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

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