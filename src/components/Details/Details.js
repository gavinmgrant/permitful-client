import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import './Details.css';

export default function Details(props) {
    const context = useContext(PermitfulContext);

    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    const handleFavorite = () => {
        const favorited = {
            permit_number: props.permitNumber,
            user_id: 1
        }
        fetch(`${config.API_ENDPOINT}/favorites`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(favorited),
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

    const checkIfFavorite = (current) => {
        const isFavorite = (favorite) => favorite === current;
        const favs = context.favorites.map(( { permit_number }) => permit_number)
        return favs.some(isFavorite);
    };
 
    return (
        <section className="details">
            {formattedDate === '' ? (
                <div className="details-default">
                    <p>The most recent permits are shown. Click a marker for permit details. Adjust the number of markers above.</p>
                </div>
            ) : (
                <div className="details-result">
                    
                    <h2>{props.streetNumber} {props.streetName} {props.streetSuffix} 
                        {props.unitNumber ? <span>
                            &nbsp;Unit {props.unitNumber}
                        </span> : ''}
                    </h2>
                    <div className="details-block">
                        <h3>
                            <span className="underline">Permit Number</span>: {props.permitNumber}
                        </h3>
                        <p><span className="underline">Status Date</span>: {formattedDate}</p>
                        <p><span className="underline">Permit Status</span>: {props.permitStatus}</p>
                        <p><span className="underline">Description</span>: {props.permitDescription}</p>
                        {TokenService.hasAuthToken() ?
                            <button 
                                disabled={checkIfFavorite(props.permitNumber)}
                                onClick={handleFavorite}
                                className="heart-button"
                            >
                                {!checkIfFavorite(props.permitNumber) ? <FontAwesomeIcon icon={farFaHeart} /> : <FontAwesomeIcon icon={fasFaHeart} />}
                            </button> 
                        : ''}
                    </div> 
                </div>
            )}
        </section>
    )
}