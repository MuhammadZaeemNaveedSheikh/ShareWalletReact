import React, { Component } from 'react';

import logo from './logo.svg';
import Balance from './components/Balance';
import Wallet from './components/Wallet';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Share Wallet logo" />
          <h1 className="App-title">My Share Wallet</h1>
        </header>
        <main className="App-main">
          <Balance />
          <Wallet />
        </main>
      </div>
    );
  }
}

export default App;
