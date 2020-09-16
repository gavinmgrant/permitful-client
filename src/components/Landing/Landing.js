import React, { Component } from 'react';
import './Landing.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <section className='landing'>
        <section className='landing-hero'>
            <h1>Permitful</h1>
            <p>Visualize and find building permits</p>
        </section>

        <section className='landing-sections'>
          <h2>Building permits map</h2>
          <p>Permitful provides an interactive map that allows users to visualize where all of the open building permits in a specific jurisdiction are located. San Francisco is the first supported jurisdiction.</p>
          <Link to='/map'>
            <button>
              View the map
            </button>
          </Link>
        </section>

        <section className='landing-sections'>
          <h2>Search for building permits</h2>
          <p>Do you have a specific property address in mind? Enter an address and find any open or previously approved building permits for that property.</p>
          <Link to='/map'>
            <button>
              Start your search
            </button>
          </Link>
        </section>

        <section className='landing-sections'>
          <h2>Property details</h2>
          <p>Once you have found a property, you can dig into its details. The property details lists any building permits and tells you their status, such as open, completed, or expired. A description of each permit will tell you the scope of work.</p>
        </section>

        <section className='landing-sections'>
          <h2>Your favorites</h2>
          <p>Registered users can select their favorite properties and quickly retrieve them later. Save time and register below.</p>
        </section>

        <RegistrationForm />
      </section>
    );
  }
}

export default Landing;