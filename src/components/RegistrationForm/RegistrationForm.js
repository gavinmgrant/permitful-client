import React from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {
    return (
        <section className="registration-container">
            <h2>Register</h2>
            <p>Registered users can select their favorite permits and quickly retrieve their details later. Save time and register below.</p>
            <form>
                <section className="registration-form">
                    <div>
                        <label htmlFor="username">Email/Username</label>
                        <input className="input-typ" type="text" name="username" id="username" placeholder="your email address" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="input-typ" type="password" name="password" id="password" placeholder="enter a password" />
                    </div> 
                </section>
                <button type='submit' className="registration-button">Submit</button>
            </form>
        </section>
    )
}