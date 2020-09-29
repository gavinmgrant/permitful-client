import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import useSWR from "swr";
import { Trash } from '../../utils/Icons';
import './FavoritesItem.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function FavoriteItem(props) {
    const context = useContext(PermitfulContext);

    // fetches the permit details from the external API using the SWR React Hook
    const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;
    const favoritePermit = props.permit_number;
    const url = "https://data.sfgov.org/resource/i98e-djp9.json?permit_number=" + favoritePermit + "&$$app_token=" + appToken;
    const { data, error } = useSWR(url, fetcher);
    const permits = data && !error ? data : [];

    // deletes selected permit from the database
    const handleDeleteFavorite = () => {
        const favoriteToDelete = props.permit_number;

        fetch(`${config.API_ENDPOINT}/favorites/${favoriteToDelete}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res => {
            if (!res.ok) 
                throw new Error(`Could not delete permit number ${favoriteToDelete}.`)
            return
            })
        .then(() => {
            context.deleteFavorite(favoriteToDelete)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    return (
        <details className="favorite-permit-item">
            <summary>
                <h3>
                    <span className="underline">Permit Number</span>: {props.permit_number}
                </h3>
            </summary>
            {permits.map(permit => (
                <div key="permit.record_id">
                    <h2>
                        {permit.street_number} {permit.street_name} {permit.street_suffix} 
                        {permit.unit_number ? <span>
                            &nbsp;Unit {permit.unit_number}
                        </span> : ''}
                    </h2>
                    <section className="favorite-details">
                        <p><span className="underline">Status Date</span>: {permit.status_date.slice(0, 10)}</p>
                        <p><span className="underline">Status</span>: {permit.status}</p>
                        <p><span className="underline">Description</span>: {permit.description}</p>
                    </section>
                </div>
            ))}
            <button onClick={handleDeleteFavorite}>
                {Trash}
            </button>
        </details>
    );
}