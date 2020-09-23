import React, { useState, useEffect } from 'react';
import Landing from '../Landing/Landing';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import PermitMap from '../PermitMap/PermitMap';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LogInForm from '../LogInForm/LogInForm';
import FavoritesList from '../FavoritesList/FavoritesList';
import PermitfulContext from '../../contexts/PermitfulContext';
import useSWR from "swr";
import config from '../../config';
import './App.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function App() {
  // get saved favorite permit numbers from the server
  const url = `${config.API_ENDPOINT}/favorites`;
  const { data, error } = useSWR(url, fetcher);
  const favoritesData = data && !error ? data : [];
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setFavorites(favoritesData)
  }, [favoritesData]);
  console.log('favorites app: ', favoritesData);

  const handleAddFavorite = favorite => {
    setFavorites(...favorites, favorite)
  };

  const handleDeleteFavorite = favoriteId => {
    setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
  };

  const value = {
    favorites: favorites,
    addFavorite: handleAddFavorite,
    deleteFavorite: handleDeleteFavorite,
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