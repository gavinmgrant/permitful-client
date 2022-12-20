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
    console.log(context.cityName);

    // fetches the permit details from the external API using the SWR React Hook
    const appToken = process.env.REACT_APP_SFGOV_APP_TOKEN;
    let cityURL;
    if (context.cityName === 'SFO') {
        cityURL = 'https://data.sfgov.org/resource/i98e-djp9.json?permit_number=';
    } else if (context.cityName === 'LAX') {
        cityURL = 'https://data.lacity.org/resource/yv23-pmwf.json?pcis_permit=';
    }

    const favoritePermit = props.permit_number;
    const url = cityURL + favoritePermit + "&$$app_token=" + appToken;
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
                    <span className="underline">Permit Number</span>: {context.cityName === 'SFO' ? props.permit_number : props.pcis_permit}
                </h3>
            </summary>
            {permits.map(permit => (
                <div key={context.cityName === 'SFO' ? permit.record_id : permit.pcis_permit}>
                    <h2>
                        {context.cityName === 'SFO' ? permit.street_number : permit.address_start} {permit.street_name} {permit.street_suffix} 
                        {permit.unit_number ? <span>
                            &nbsp;Unit {context.cityName === 'SFO' ? permit.unit_number: permit.unit_range_end}
                        </span> : ''}
                    </h2>
                    <section className="favorite-details">
                        <p><span className="underline">Status Date</span>: {permit.status_date.slice(0, 10)}</p>
                        <p><span className="underline">Status</span>: {context.cityName === 'SFO' ? permit.status : permit.latest_status}</p>
                        <p><span className="underline">Description</span>: {context.cityName === 'SFO' ? permit.description: permit.work_description}</p>
                    </section>
                </div>
            ))}
            <button onClick={handleDeleteFavorite}>
                {Trash}
            </button>
        </details>
    );
}