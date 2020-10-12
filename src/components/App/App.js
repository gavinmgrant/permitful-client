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