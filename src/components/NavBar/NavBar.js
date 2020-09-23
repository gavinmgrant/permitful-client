import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <nav role="navigation">
            <h3>
                <Link to='/' className='logo'>
                    Permitful
                </Link>
            </h3>
            <ul>
                <Link to='/favorites' style={{ textDecoration: 'none' }}><li className='nav-bar'>Favorites</li></Link>
                <Link to='/register' style={{ textDecoration: 'none' }}><li className='nav-bar'>Register</li></Link>
                <Link to='/login' style={{ textDecoration: 'none' }}><li className='nav-bar'>Log In</li></Link>
            </ul>
        </nav>
    )
}