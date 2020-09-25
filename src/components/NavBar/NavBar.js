import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './NavBar.css';

export default class NavBar extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        window.location.reload(false);
    }

    renderLogoutLink() {
        return (
            <div className='navbar-logged-in'>
                <ul>
                    <Link 
                        to='/favorites' 
                        style={{ textDecoration: 'none' }}
                    >
                        <li className='nav-bar'>Favorites</li>
                    </Link>
                    <Link
                        onClick={this.handleLogoutClick}
                        to='/'
                        style={{ textDecoration: 'none' }}
                    >
                        <li className='nav-bar'>Log Out</li>
                    </Link>
                </ul>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='navbar-not-logged-in'>
                <ul>
                    <Link 
                        to='/register' 
                        style={{ textDecoration: 'none' }}
                    >
                        <li className='nav-bar'>Register</li>
                    </Link>
                    <Link 
                        to='/login' 
                        style={{ textDecoration: 'none' }}
                    >
                        <li className='nav-bar'>Log In</li>
                    </Link>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <nav role="navigation">
                <h3>
                    <Link to='/' className='logo'>
                        Permitful
                    </Link>
                </h3>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        )
    }
}