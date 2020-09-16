import React, { Component } from 'react';
import Landing from '../Landing/Landing';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import PermitMap from '../PermitMap/PermitMap';
import SearchForm from '../SearchForm/SearchForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LogInForm from '../LogInForm/LogInForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/map' component={PermitMap} />
          <Route path='/search' component={SearchForm} />
          <Route path='/register' component={RegistrationForm} />
          <Route path='/login' component={LogInForm} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;