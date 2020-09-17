import React from 'react';
import './Details.css';

export default function Details(props) {
    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    return (
        <section className="details">
            <h2>{props.streetNumber} {props.streetName} {props.streetSuffix} {props.unitNumber}</h2>
            {formattedDate === '' ? (
                <p>The markers above represent the 200 most recently created permits in San Francisco. Click on one for details.</p>
            ) : (
                <div>
                    <p>Status Date: {formattedDate}</p>
                    <p>Permit Number: {props.permitNumber}</p>
                    <p>Permit Status: {props.permitStatus}</p>
                    <p>Description: {props.permitDescription}</p>
                </div>
            )}
        </section>
    )
}