import React from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {
    return (
        <section className="registration-container">
            <h2>Register</h2>
            <form>
                <section className="registration-form">
                    <div>
                        <label htmlFor="first-name">First name</label>
                        <input className="input-typ" type="text" name="first-name" id="first-name" placeholder="your first name" />
                    </div>
                    <div>
                        <label htmlFor="last-name">Last name</label>
                        <input className="input-typ" type="text" name="last-name" id="last-name" placeholder="your last name" />
                    </div>
                    <div>
                        <label htmlFor="username">Email</label>
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