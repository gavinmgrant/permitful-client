import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import './Details.css';

export default function Details(props) {
    const context = useContext(PermitfulContext);

    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    const handleFavorite = () => {
        const favorited = {
            permit_number: props.permitNumber
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
                    </div>
                    <button 
                        disabled={checkIfFavorite(props.permitNumber)}
                        onClick={handleFavorite}
                    >
                        {!checkIfFavorite(props.permitNumber) ? 'Add to favorites' : 'Favorited'}
                    </button>  
                </div>
            )}
        </section>
    )
}