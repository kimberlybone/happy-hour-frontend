import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import {Route, NavLink, Switch, Link} from 'react-router-dom'

const URL = 'http://localhost:3000'

class App extends Component {

  state = {
    isReturningUser: true,
    errors: []
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
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      }
    })
  }

  onSubmitSignUp = (user) => {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }
    fetch(URL + '/users', config)
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      }
    })
  }

  render() {
    const { state: {isReturningUser, errors},
            onSubmitLogIn, onSubmitSignUp } = this

    return (
      <div className="App">
        <Route exact
          path= '/login'
          render={(props) =>
            < LoginForm {...props}
            isReturningUser={ true }
            errors={ errors }
            onSubmitLogIn={ onSubmitLogIn }
            onSubmitSignUp={ onSubmitSignUp }/>}
           />
         <Route exact
           path= '/signup'
           render={(props) =>
             < LoginForm {...props}
             isReturningUser={ false }
             errors={ errors }
             onSubmitLogIn={ onSubmitLogIn }
             onSubmitSignUp={ onSubmitSignUp }/>}
            />
      </div>
    );
  };
};

export default App;
