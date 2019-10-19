import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import HomeContainer from './containers/HomeContainer'
import {Route, NavLink, Switch, Link, withRouter} from 'react-router-dom'
import 'bulma/css/bulma.css'

const URL = 'http://localhost:3000'
const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

class App extends Component {

  state = {
    errors: [],
    user: null,
    token: ''
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
        this.setState({user}, () => this.goHome())
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
      }
    })
  }

  goHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { state: {errors, user},
            onSubmitLogIn, onSubmitSignUp} = this

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
               user={user}/> }
             />
      </div>
    );
  };
};

export default withRouter(App);
