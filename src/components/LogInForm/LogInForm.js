import React, { Component } from 'react';
import './LogInForm.css';

export default class LogInForm extends Component {
    render() {
        return (
            <section className="login-container">
                <h2>Log In</h2>
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
}