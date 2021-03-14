import React, { Component } from 'react'
import PermitfulContext from '../../contexts/PermitfulContext';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../../utils/Utils'
import './LogInForm.css';

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {
        }
    };
    static contextType = PermitfulContext;

    state = { 
        error: null, 
        isLoading: false 
    };

    _isMounted = false;

    // posts user credentials to the server once user submits
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this._isMounted = true;
        this.setState({ error: null, isLoading: true })
        const { user_name, password } = ev.target
    
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
            })
            .then(res => {
                if (this._isMounted) {
                    this.context.setUserId(res.user_id)
                    this.context.setUserName(res.user_name)
                    user_name.value = ''
                    password.value = ''
                    TokenService.saveAuthToken(res.authToken)
                    this.props.onLoginSuccess()
                }
            })
            .catch(res => {
                if (this._isMounted) {
                    this.setState({ error: Object.values(res.error) })
                }
            })
            .finally(() => {
                if (this._isMounted) {
                    this.setState({ isLoading: false })
                }
            })
    };

    componentWillUnmount() {
        // cancel all subscriptions and asynchronous tasks when unmounted
        this._isMounted = false;
    }

    render() {
        const { error } = this.state
        return (
            <section className="login-container">
                <h2>Login</h2>
                <p>Welcome back! Please log in below to access your favorites.</p>
                <section className="demo">
                    <p>To demo this site without registering, log in with these credentials:</p>
                    <p>username: <span className="bold">newuser</span></p>
                    <p>password: <span className="bold">Testing123!</span></p>
                </section>

                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <section className="login-form">
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
                        {!this.state.isLoading ? 'Log in' : 'Loading...'}
                    </Button>
                    <p className="italic">If you'd like to register for an account at Permitful,{' '}
                        <span>
                            <Link to='/register'>register here</Link>
                        </span>.
                    </p>
                </form>
            </section>
        )
    }
};