import React from 'react';
import { Link } from 'react-router-dom';
import './LogInForm.css';

export default function LogInForm() {
    return (
        <section className="login-container">
            <h2>Log In</h2>
            <p>Welcome back! Please log in below to access your favorites. If you'd like to register for an account at Permitful,{' '}
                <span>
                    <Link to='/register'>register here</Link>
                </span>.
            </p>
            <form>
                <section className="login-form">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input className="input-typ" type="text" name="username" id="username" placeholder="enter your email address" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="input-typ" type="password" name="password" id="password" placeholder="enter your password" />
                    </div> 
                </section>
                <button type='submit' className='login-button'>Submit</button>
            </form>
        </section>
    )
}