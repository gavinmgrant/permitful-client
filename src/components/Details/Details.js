import React, { useState, useCallback } from 'react';
import Favorite from '../Favorite/Favorite';
import './Details.css';

export default function Details(props) {
    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    // gets marker limit amount from search bar
    const [heartIcon, setHeartIcon] = useState(false);
    const handleHeartToggle = useCallback(heartState => {
        setHeartIcon(heartState);
    }, []);
    console.log('Heart: ', heartIcon);

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
                        <Favorite 
                            handleHeartToggle={handleHeartToggle}
                        />
                        <p><span className="underline">Status Date:</span> {formattedDate}</p>
                        <p><span className="underline">Permit Number:</span> {props.permitNumber}</p>
                        <p><span className="underline">Permit Status:</span> {props.permitStatus}</p>
                        <p><span className="underline">Description:</span> {props.permitDescription}</p>
                    </div>
                </div>
            )}
        </section>
    )
}