import React from 'react';
import './Details.css';

export default function Details(props) {
    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    return (
        <section className="details">
            <h2>{props.streetNumber} {props.streetName} {props.streetSuffix} {props.unitNumber}</h2>
            {formattedDate === '' ? (
                <p>The markers above represent the most recently created permits in San Francisco. Click one for details.</p>
            ) : (
                <div>
                    <div className="details-block">
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