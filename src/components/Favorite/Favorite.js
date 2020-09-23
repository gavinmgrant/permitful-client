import React, { useState, useEffect, useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import './Favorite.css';

export default function Favorite(props) {
    const context = useContext(PermitfulContext);
    const favorites = context.favorites;
    
    const [heartIcon, setHeartIcon] = useState(false);
    const handleHeartIcon = props.handleHeartIcon;
    useEffect(() => {
        handleHeartIcon(heartIcon);
    }, [heartIcon, handleHeartIcon]);
 
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

    const handleDeleteFavorite = () => {
        const favoriteToDelete = props.permitNumber;

        fetch(`${config.API_ENDPOINT}/favorites/${favoriteToDelete}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
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
    
    function toggleHeart() {
        if (!heartIcon) {
            setHeartIcon(true);
        } else {
            setHeartIcon(false);
        }
    };

    function handleHeartClick() {
        if (!heartIcon) {
            handleFavorite();
        } else {
            handleDeleteFavorite();
        }
        toggleHeart();
    }

    return (
        <section className="favorite" onClick={handleHeartClick}>
            {heartIcon ? <FontAwesomeIcon icon={fasFaHeart} /> : <FontAwesomeIcon icon={farFaHeart} />}
        </section>
    )
}