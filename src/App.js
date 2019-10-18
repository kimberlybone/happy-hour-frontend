import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
const URL = 'http://localhost:3000'
class App extends Component {

  state = {
    isReturningUser: true
  }

  onSubmitLogIn = (user) => {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }
    fetch(URL + '/login', config)
    .then(res => res.json())
    .then(console.log)
  }

  render() {
    const { state: {isReturningUser}, onSubmitLogIn } = this
    return (
      <div className="App">
        < LoginForm
        isReturningUser={ isReturningUser }
        onSubmitLogIn={ onSubmitLogIn }/>
      </div>
    );
  };
};

export default App;
