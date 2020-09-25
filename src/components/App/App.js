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
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        favorites: [],
        error: null
      }
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
    window.location.reload(false);
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
  }

  render() {
    const value = {
      favorites: this.state.favorites,
      addFavorite: this.handleAddFavorite,
      deleteFavorite: this.handleDeleteFavorite,
    };
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
    );
  }
}

export default App;