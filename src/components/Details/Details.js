import React, { useContext, useState } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import { HeartSolid, HeartOutline, CloseIcon } from '../../utils/Icons';
import './Details.css';

export default function Details(props) {
    const context = useContext(PermitfulContext);
    const [isLoading, setIsLoading] = useState(false);
    const [close, setClose] = useState(false);

    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    // fetches favorites from the database
    const handleFavorite = () => {
        setIsLoading(true);
        const favorited = {
            permit_number: props.permitNumber,
            user_id: context.userId
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
        .finally(() => {
            setIsLoading(false);
        })
    }

    // deletes selected permit from the database
    const handleDeleteFavorite = () => {
        setIsLoading(true);
        const favoriteToDelete = props.permitNumber;
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
            setIsLoading(false)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    // checks if the current permit selected is in the favorites list
    const checkIfFavorite = (current) => {
        const isFavorite = (favorite) => favorite === current;
        const favs = context.favorites.map(({ permit_number }) => permit_number)
        return favs.some(isFavorite);
    };
 
    return (
        <section className="details">
            {formattedDate === '' ? (
                <div>
                    {!close ? (
                        <div className="details-default">
                            <p className="details-intro">
                                The most recent permits are shown. Click a marker for permit details. Adjust the number of markers above.
                            </p>
                            <button className="details-close" onClick={() => setClose(true)}>
                                {CloseIcon}
                            </button>
                        </div>
                    )
                    : ""}
                </div>
            ) : (
                <div className="details-result">
                    <h3 className="details-address">{props.streetNumber} {props.streetName} {props.streetSuffix} 
                        {props.unitNumber ? <span>
                            &nbsp;Unit {props.unitNumber}
                        </span> : ''}
                    </h3>
                    <div className="details-block">
                        <h4>
                            {isLoading ? 'Updating your favorites!' : `Permit Number: ${props.permitNumber}`}
                        </h4>
                        <p><span className="bold">Status Date</span>: {formattedDate}</p>
                        <p><span className="bold">Permit Status</span>: {props.permitStatus}</p>
                        <p><span className="bold">Description</span>: {props.permitDescription}</p>
                        {TokenService.hasAuthToken() ?
                            <button 
                                disabled={isLoading}
                                onClick={!checkIfFavorite(props.permitNumber) ? handleFavorite : handleDeleteFavorite}
                                className="heart-button"
                            >
                                {!checkIfFavorite(props.permitNumber) ? HeartOutline : HeartSolid}
                            </button> : ''}
                    </div> 
                </div>
            )}
        </section>
    )
}