import React, { Component } from 'react';
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import '../HomeContainer.css';

const URL = 'http://localhost:3000';

export default class HomeContainer extends Component {

  state = {
    viewMenu: false,
    user: null,
    showFavorites: false,
    errors: []
  }

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

  componentDidMount() {
    const { loggedInUserId, token } = this.props

    // fetch user info
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

  render() {
    const { props:{ loggedInUserId, token },
            state:{ viewMenu, user, showFavorites, errors },
            handleFavorites,
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
            />
      </div>
    )
  }


}
