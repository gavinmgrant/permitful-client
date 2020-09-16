import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <nav role="navigation">
                <h3>
                    <Link to='/' className='logo'>
                        Permitful
                    </Link>
                </h3>
                <ul>
                    <Link to='/map' style={{ textDecoration: 'none' }}><li className='nav-bar'>Map</li></Link>
                    <li>Search</li>
                    <li>Register</li>
                    <li>Log in</li>
                </ul>
            </nav>
        )
    }
}