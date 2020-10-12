import React, { Component } from 'react';
import Landing from '../Landing/Landing';
import NavBar from '../NavBar/NavBar';
import PrivateRoute from '../../utils/PrivateRoute';
import PublicOnlyRoute from '../../utils/PublicOnlyRoute';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import PermitMap from '../PermitMap/PermitMap';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LogInForm from '../LogInForm/LogInForm';
import FavoritesList from '../FavoritesList/FavoritesList';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userId: 1,
        userName: null,
        favorites: [],
        error: null
      }
  };

  handleSetUserId = id => {
    this.setState({
      userId: id
    })
  };

  handleSetUserName = name => {
    this.setState({
      userName: name
    })
  };

  handleAddFavorite = favorite => {
    this.setState({
      favorites: [ ...this.state.favorites, favorite],
    })
  };

  handleDeleteFavorite = favoriteId => {
    this.setState({
      favorites: this.state.favorites.filter(favorite => favorite.permit_number !== favoriteId)
    });
  };

  handleSetFavorites = favs => {
    this.setState({
      favorites: favs
    })
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/favorites`, {
      method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          favorites: data,
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get favorite permits at this time.'
        });
      })
    
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    // if a user is logged in...
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        // the timoue will call this callback just before the token expires
        AuthApiService.postRefreshToken()
      })
    }
  }

  render() {
    const value = {
      userId: this.state.userId,
      userName: this.state.userName,
      favorites: this.state.favorites,
      setUserId: this.handleSetUserId,
      setUserName: this.handleSetUserName,
      addFavorite: this.handleAddFavorite,
      deleteFavorite: this.handleDeleteFavorite,
      setFavorites: this.handleSetFavorites,
    }

    return (
      <PermitfulContext.Provider value={value}>
        <main className='app'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/map' component={PermitMap} />
            <PublicOnlyRoute path='/register' component={RegistrationForm} />
            <PublicOnlyRoute path='/login' component={LogInForm} />
            <PrivateRoute path='/favorites' component={FavoritesList} />
          </Switch>
          <Footer />
        </main>
      </PermitfulContext.Provider>
    )
  }
}

export default App;