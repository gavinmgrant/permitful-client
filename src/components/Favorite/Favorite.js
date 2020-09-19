import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import './Favorite.css';

export default function Favorite(props) {
    function toggleHeart() {
        if (!heartIcon) {
            setHeartIcon(true);
        } else {
            setHeartIcon(false);
        }
    };

    // sends heart click value to parent
    const [heartIcon, setHeartIcon] = useState(false);
    const handleHeartToggle = props.handleHeartToggle;
    useEffect(() => {
        handleHeartToggle(heartIcon);
    }, [heartIcon, handleHeartToggle]);

    return (
        <section className="favorite" onClick={toggleHeart}>
            {heartIcon ? <FontAwesomeIcon icon={fasFaHeart} /> : <FontAwesomeIcon icon={farFaHeart} />}
        </section>
    )
}