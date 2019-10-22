import React, { Component } from 'react';
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import '../HomeContainer.css';

const URL = 'http://localhost:3000';

export default class HomeContainer extends Component {

  state = {
    viewMenu: false,
    user: null,
    showFavorites: false
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
    .then(user => this.setState({user}))
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
    .then( user => this.setState({user}))
  }

  render() {
    const { props:{ loggedInUserId, token },
            state:{ viewMenu, user, showFavorites },
            handleFavorites,
            handleCloseMenu,
            handleViewMenu,
            handleAddFavorite } = this

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
            handleCloseMenu={ handleCloseMenu }
            handleAddFavorite={ handleAddFavorite }
            />
      </div>
    )
  }


}
