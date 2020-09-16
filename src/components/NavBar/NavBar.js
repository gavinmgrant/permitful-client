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
                    <Link to='/search' style={{ textDecoration: 'none' }}><li className='nav-bar'>Search</li></Link>
                    <Link to='/register' style={{ textDecoration: 'none' }}><li className='nav-bar'>Register</li></Link>
                    <Link to='/login' style={{ textDecoration: 'none' }}><li className='nav-bar'>Log In</li></Link>
                </ul>
            </nav>
        )
    }
}