import React from 'react';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <section className='landing'>
      <section className='landing-container'>
        <div className='landing-hero'>
          <h1 className="title">Permitful</h1>
          <p>Visualize and find building permits</p>
          <Link to='/map'>
            <button>
              Get started
            </button>
          </Link>
        </div>
      </section>

      <section className='landing-sections'>
        <h2>View the most recent building permits map</h2>
        <p>Permitful provides an interactive map that allows users to visualize where all of the most recently updated building permits in a specific jurisdiction are located.</p>
        <p><span className="underline">San Francisco</span> is the first supported jurisdiction.</p>
      </section>

      <section className='landing-sections'>
        <h2>Search for building permits by address</h2>
        <p>Do you have a specific property address in mind? Enter an address and find any building permit on file for that property.</p>
      </section>

      <section className='landing-sections'>
        <h2>Analyse the permit details</h2>
        <p>Once your search finds a property, Permitful lists any building permits on file. For each permit, you will find its permit number, status, and a brief description.</p>
      </section>

      <section className='landing-sections'>
        <h2>Save your favorites</h2>
        <p>Registered users can select their favorite permits and quickly retrieve their details later. Save time and register below.</p>
      </section>

      {TokenService.hasAuthToken() ? "" :
        <section className="cta-container">
          <Link to='/register'>
            <button className="cta-button">
              New users register here
            </button>
          </Link>
          <Link to='/login'>
            <button className="cta-button">
              Existing users log in
            </button>
          </Link>
        </section>
      }
    </section>
  );
}