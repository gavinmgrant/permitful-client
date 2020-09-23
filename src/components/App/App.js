import React, { Component } from 'react';
import Landing from '../Landing/Landing';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import PermitMap from '../PermitMap/PermitMap';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LogInForm from '../LogInForm/LogInForm';
import FavoritesList from '../FavoritesList/FavoritesList';
import PermitfulContext from '../../contexts/PermitfulContext';
import config from '../../config';
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
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/favorites`)
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
            <Route path='/register' component={RegistrationForm} />
            <Route path='/login' component={LogInForm} />
            <Route path='/favorites' component={FavoritesList} />
          </Switch>
          <Footer />
        </main>
      </PermitfulContext.Provider>
    );
  }
}

export default App;