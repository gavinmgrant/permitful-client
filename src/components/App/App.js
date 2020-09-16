import React, { Component } from 'react';
import Landing from '../Landing/Landing';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import PermitMap from '../PermitMap/PermitMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/map' component={PermitMap} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;