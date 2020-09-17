import React from 'react';
import './ResultsBar.css';

export default function ResultsBar(props) {
    const date = props.statusDate
    const formattedDate = date.slice(0, 10);

    return (
        <section className="results-bar">
            <h2>{props.streetNumber} {props.streetName} {props.streetSuffix} {props.unitNumber}</h2>
            <p>Status Date: {formattedDate}</p>
            <p>Permit Number: {props.permitNumber}</p>
            <p>Description: {props.permitDescription}</p>
        </section>
    )
}