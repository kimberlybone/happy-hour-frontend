import React, { Component } from 'react';
import LoginForm from './components/LoginForm'
import HomeContainer from './containers/HomeContainer'
import CreateDrink from './containers/CreateDrink'
import NotFound from './components/NotFound'
import {Route, Switch, withRouter} from 'react-router-dom'
import 'bulma/css/bulma.css'
import './stylesheets/App.css';

const URL = 'http://localhost:3000'


class App extends Component {

  state = {
    errors: [],
    loggedInUserId: localStorage.loggedInUserId,
    token: localStorage.token,
    occupied: {
      bs1: false,
      bs2: false,
      bs3: false,
      bs4: false,
      bs5: false
    }
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

  occupySpot = spot => {
    // console.log('occupied');
    this.setState({
      ...this.state,
      occupied: {
        ...this.state.occupied,
        [spot]: true
      }
    })
  }

  unoccupySpots = () => {
    this.setState({
      ...this.state,
      occupied: {
        bs1: false,
        bs2: false,
        bs3: false,
        bs4: false,
        bs5: false
      }
    })
  }

  goHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { state: {errors, loggedInUserId, token, occupied},
            onSubmitLogIn, onSubmitSignUp, goHome, occupySpot, unoccupySpots } = this

    return (
      <div className="App">
        <Switch>
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
                  token={ token }
                  occupied={ occupied }
                  occupySpot={ occupySpot }
                  unoccupySpots={ unoccupySpots }/> }
                  />
                <Route exact
                  path= '/create-drink'
                  render={(props) =>
                    < CreateDrink {...props}
                    goHome={goHome}/>}
                    />
                  <Route component={ NotFound } />
        </Switch>
      </div>
    );
  };
};

export default withRouter(App);
