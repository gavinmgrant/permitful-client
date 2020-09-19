import React from 'react';
import './Landing.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section className='landing'>
      <section className='landing-hero'>
          <h1>Permitful</h1>
          <p>Visualize and find building permits</p>
          <Link to='/map'>
          <button>
            Get started
          </button>
        </Link>
      </section>

      <section className='landing-sections'>
        <h2>Building permits map</h2>
        <p>Permitful provides an interactive map that allows users to visualize where all of the most recently updated building permits in a specific jurisdiction are located.</p>
        <p>San Francisco is the first supported jurisdiction.</p>
      </section>

      <section className='landing-sections'>
        <h2>Search for building permits</h2>
        <p>Do you have a specific property address in mind? Enter an address and find any building permit on file for that property.</p>
      </section>

      <section className='landing-sections'>
        <h2>Permit details</h2>
        <p>Once your search finds a property, Permitful lists any building permits on file. For each permit, you will find its permit number, status, and a brief description.</p>
      </section>

      <section className='landing-sections'>
        <h2>Your favorites</h2>
        <p>Registered users can select their favorite permits and quickly retrieve their details later. Save time and register below.</p>
      </section>

      <RegistrationForm />
    </section>
  );
}