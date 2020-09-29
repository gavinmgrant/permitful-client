import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../../utils/Utils'
import './LogInForm.css';

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {
            window.location.reload(false);
        }
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
    
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
        })
            .catch(res => {
                this.setState({ error: res.error })
        })
    }

    render() {
        const { error } = this.state
        return (
            <section className="login-container">
                <h2>Log In</h2>
                <p>Welcome back! Please log in below to access your favorites.</p>
                <p>If you'd like to register for an account at Permitful,{' '}
                    <span>
                        <Link to='/register'>register here</Link>
                    </span>.
                </p>
                <section className="demo">
                    <p>To demo this site without registering, log in with these credentials:</p>
                    <p>username: <span className="bold">newuser</span></p>
                    <p>password: <span className="bold">Testing123!</span></p>
                </section>
                
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <section className="login-form">
                        <div role='alert'>
                            {error && <p className='error'>{error}</p>}
                        </div>
                        <div className='input-typ'>
                            <label htmlFor="username">Username</label>
                            <Input
                                required
                                name='user_name'
                                id='LoginForm__user_name'>
                            </Input>
                        </div>
                        <div className='input-typ'>
                            <label htmlFor="password">Password</label>
                            <Input
                                required
                                name='password'
                                type='password'
                                id='LoginForm__password'>
                            </Input>
                        </div> 
                    </section>
                    <Button type='submit'>
                        Login
                    </Button>
                </form>
            </section>
        )
    }
}