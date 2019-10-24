import React, { Component } from 'react';
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import '../stylesheets/HomeContainer.css';
import {Route, withRouter} from 'react-router-dom'

const URL = 'http://localhost:3000';

export default class HomeContainer extends Component {

  state = {
    viewMenu: false,
    user: null,
    showFavorites: false,
    errors: []
  }


  // FETCH USER INFO
  componentDidMount() {
    const { loggedInUserId, token } = this.props
    fetch(URL + '/users/' + loggedInUserId, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(user => this.setState({user}))
  }


  deleteFavorite = id => {
    const { token } = this.props
    const config = {
      method: 'DELETE',
      headers: {'Authorization': token}
    }
    fetch(URL + '/favorites/' + id, config)
    .then(res => res.json())
    .then(user => this.setState({user}))
  }


  updateBudget = (user, recipe) => {
    const { loggedInUserId, token } = this.props
    const newBudget = user.budget - recipe.price
    if(newBudget >= 0){
      const config = {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          budget: newBudget
        })
      }
      fetch(URL + '/users/' + loggedInUserId, config)
      .then(res => res.json())
      .then(user => {
        this.setState({user})
      })
      alert(`You just bought ${recipe.name} for $${recipe.price}!`)
    } else {
      this.setState({
        errors: "You don't need any more drank. Get a job."
      })
      setTimeout(() => this.setState({errors: []}), 2500)
    }
  }



// HANDLERS
  handleViewMenu = () => {
    this.setState({
      viewMenu: true
    })
  }


  handleCloseMenu = () => {
    this.setState({
      viewMenu: false
    })
  }


  handleFavorites = () => {
    this.setState(prevState => {
      return {showFavorites: !prevState.showFavorites }
    })
  }


  handleAddFavorite = id => {
    const { loggedInUserId, token } = this.props;
    const config = {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'recipe_id': id,
        'user_id': loggedInUserId
      })
    }
    fetch(URL + '/favorites', config)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.errors) {
        console.log(response.errors);
        this.setState({errors: response.errors})
        setTimeout(() => this.setState({errors: []}), 2500)
      } else {
        this.setState({
          user: response,
        })
      }
    })
  }



  render() {
    const { props:{ loggedInUserId, token, occupied, occupySpot, unoccupySpots },
            state:{ viewMenu, user, showFavorites, errors },
            handleFavorites,
            updateBudget,
            handleCloseMenu,
            handleViewMenu,
            handleAddFavorite,
            deleteFavorite } = this

    return (
      <div className="home-container">
        < SideBar
            loggedInUserId={ loggedInUserId }
            token={ token }
            viewMenu={ handleViewMenu }
            user={ user }
            showFavorites={ showFavorites }
            handleFavorites={ handleFavorites }
            unoccupySpots={ unoccupySpots }
            />
        < MainContainer
            viewMenu={ viewMenu }
            loggedInUserId={ loggedInUserId }
            token={ token }
            user={ user }
            errors={ errors }
            handleCloseMenu={ handleCloseMenu }
            handleAddFavorite={ handleAddFavorite }
            deleteFavorite={ deleteFavorite }
            updateBudget={updateBudget}
            occupied={ occupied }
            occupySpot={ occupySpot }
            />
      </div>
    )
  }


}
