import React, { Component } from 'react';
import LoginForm from './components/LoginForm'
import HomeContainer from './containers/HomeContainer'
import {Route, Switch, NavLink, withRouter} from 'react-router-dom'
import 'bulma/css/bulma.css'
import './App.css';

const URL = 'http://localhost:3000'
// const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

class App extends Component {

  state = {
    errors: [],
    loggedInUserId: localStorage.loggedInUserId,
    token: localStorage.token
  }

  setAuth = (loggedInUserId, token) => {
    localStorage.loggedInUserId = loggedInUserId;
    localStorage.token = token;
    console.log(localStorage);
    this.setState({
      loggedInUserId,
      token
    }, () => this.goHome())
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
    .then(user => {
      if (user.errors) {
        this.setState({
          errors: user.errors
        })
      } else {
        this.setAuth(user.user_id, user.token)
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
    .then(user => {
      if (user.errors) {
        this.setState({
          errors: user.errors
        })
      } else {
        this.setAuth(user.user_id, user.token)
      }
    })
  }

  goHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { state: {errors, loggedInUserId, token},
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
           <Route exact
             path='/'
             render={ () => < HomeContainer
               loggedInUserId={ loggedInUserId }
               token={ token }/> }
             />
      </div>
    );
  };
};

export default withRouter(App);
