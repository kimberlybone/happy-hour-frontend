import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'

class App extends Component {

  state = {
    isReturningUser: false
  }

  render() {
    const { state: {isReturningUser} } = this
    return (
      <div className="App">
        < LoginForm isReturningUser={ isReturningUser }/>
      </div>
    );
  };
};

export default App;
