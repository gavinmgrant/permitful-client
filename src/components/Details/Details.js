import React from 'react';
import './Details.css';

export default function Details(props) {
    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    return (
        <section className="details">
            {formattedDate === '' ? (
                <p>The most recent permits are shown. Click a marker for permit details. Adjust the number of markers above.</p>
            ) : (
                <div>
                    <h2>{props.streetNumber} {props.streetName} {props.streetSuffix} 
                        {props.unitNumber ? <span>
                            &nbsp;Unit {props.unitNumber}
                        </span> : ''}
                    </h2>
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