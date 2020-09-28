import React, { Component } from 'react';
import { Button, Input, Required } from '../../utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {  
    state = { 
        error: null,
        onRegistrationSuccess: false
    };

    handleSubmit = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target
    
        this.setState({ error: null })
        AuthApiService.postUser({
          user_name: user_name.value,
          password: password.value,
        })
        .then(user => {
            user_name.value = ''
            password.value = ''
            this.setState({ onRegistrationSuccess: true })
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    };

    render() {
        const { error } = this.state
        return (
            <section className="registration-container">
                <h2>Register</h2>
                <p>Registered users can select their favorite permits and quickly retrieve their details later. Save time and register below.</p>
                {this.state.onRegistrationSuccess ? <p className='success'>Success! We have saved your credentials. You can now log in to save favorites.</p> : ''}
                <form onSubmit={this.handleSubmit}>
                    <section className="registration-form">
                        <div role='alert'>
                            {error && <p className='error'>{error}</p>}
                        </div>
                        <div>
                            <label htmlFor="username">
                                Username <Required />
                            </label>
                            <Input
                                name='user_name'
                                type='text'
                                required
                                id='RegistrationForm__user_name'>
                            </Input>
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password <Required />
                            </label>
                            <Input
                                name='password'
                                type='password'
                                required
                                id='RegistrationForm__password'>
                            </Input>
                        </div> 
                    </section>
                    <Button type='submit'>
                        Register
                    </Button>
                </form>
            </section>
        )
    }
};