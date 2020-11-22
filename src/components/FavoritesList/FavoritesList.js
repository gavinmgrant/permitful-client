import React, { Component } from 'react';
import PermitfulContext from '../../contexts/PermitfulContext';
import { Link } from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import FavoritesItem from '../FavoritesItem/FavoritesItem';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import './FavoritesList.css';

export default class FavoritesList extends Component {
    static contextType = PermitfulContext;

    constructor(props) {
        super(props);
          this.state = {
            favorites: [],
            error: null
          }
      };

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/favorites`, {
          method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then(data => {
            this.context.setFavorites(data);
          })
          .catch(err => {
            this.setState({
              error: 'Sorry, could not get favorite permits at this time.'
            });
          })
        
        IdleService.setIdleCallback(this.logoutFromIdle)

        if (TokenService.hasAuthToken()) {
            
          IdleService.regiserIdleTimerResets()

          TokenService.queueCallbackBeforeExpiry(() => {
            AuthApiService.postRefreshToken()
          })
        }
    }

    render() {
        return (
            <div className="favorites-list">
                <h2>Favorites</h2>
                <h3>{this.context.userName ? <span className="white"> Welcome back, {this.context.userName}!</span> : null}</h3>
                <ul>
                    {this.context.favorites.map(favorite => 
                        <li 
                            key={favorite.id}
                            className="favorite-permit-li"
                        >
                            <FavoritesItem 
                                permit_number={favorite.permit_number}
                            />
                        </li>)}
                </ul>
                <Link to="/map">
                    <button className="restart-button">Start new search</button>
                </Link>
                <section className="demo">
                  If you want to know if a property could be a good investment, try rental property calculator <a href="https://soundlyinvest.com/" target="_blank" rel="noopener noreferrer" className="soundlyinvest-link">SoundlyInvest</a> to determine your gross rent multiplier, cap rate, and cash flow.    
                </section>
            </div>
        );
    }
}