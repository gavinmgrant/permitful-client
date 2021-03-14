import React, { useContext } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import { CheckCircle, HeartOutline } from '../../utils/Icons';
import './Landing.css';

export default function Landing() {
  const context = useContext(PermitfulContext);

  return (
    <section className='landing'>
      <section className='landing-container'>
        <div className='landing-hero'>
          <h1 className="title">Permitful</h1>
          <p className='title-sub'>Visualize and find building permits.</p>
          <p className='title-sub'>Select a jurisdiction:</p>
          <div className='landing-buttons'>
            <Link to='/map'>
              <button className='title-button' onClick={() => context.setCityName('SFO')}>
                San Francisco
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className='landing-sections'>
        <h2>{CheckCircle} View the most recent building permits map</h2>
        <p>Permitful provides an interactive map that allows users to visualize where all of the most recently updated building permits in a specific jurisdiction are located.</p>
      </section>

      <section className='landing-sections'>
        <h2>{CheckCircle} Search for building permits by address</h2>
        <p>Do you have a specific property address in mind? Enter an address and find any building permit on file for that property.</p>
      </section>

      <section className='landing-sections'>
        <h2>{CheckCircle} Analyze the permit details</h2>
        <p>Once your search finds a property, Permitful lists any building permits on file. For each permit, you will find its permit number, status, and a brief description.</p>
      </section>

      <section className='landing-sections'>
        <h2>{CheckCircle} Save your favorites</h2>
        <p>Registered users can select their favorite permits and quickly retrieve their details later. Click the {HeartOutline} to save the permit to your favorites. The {HeartOutline} icon will only appear when you are logged in. Save time and register.</p>
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
      <p className='photo-credit'>
        Photo above by <a href="https://unsplash.com/@robertbye?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Robert Bye</a> on <a href="https://unsplash.com/@robertbye?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
      </p>
    </section>
  );
}