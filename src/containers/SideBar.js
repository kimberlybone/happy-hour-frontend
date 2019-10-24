import React, { Component } from 'react';
import '../stylesheets/SideBar.css';
import User from '../components/User'
import Favorite from '../components/Favorite'
import { NavLink } from 'react-router-dom'

// const URL = 'http://localhost:3000'

export default class SideBar extends Component {

  getFavorites = () => {
    const { user } = this.props;
    console.log(user);
    if (user) {
      const {favorites} = user;
      return favorites.map(favorite => {
        return < Favorite recipe={favorite.recipe} key={favorite.id}/>
      })
    } else {
      return null
    }
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.unoccupySpots()
  }

  render(){
    const { props: {
              viewMenu,
              user,
              showFavorites,
              handleFavorites },
            getFavorites } = this

    return (
      < div className="side-bar" >
        { user ? < User user={user} /> : null }
        < div className="bottom-side-bar">
        < button className="button is-primary is-light side-button" onClick={ handleFavorites }> { showFavorites ? "Close" : "Favorites"} < /button >
          < div className='favorite-side-bar'>{ showFavorites ? getFavorites() : null }< /div >
          < br >< /br >
          < button className="button is-primary is-light side-button" onClick={ viewMenu }>View Menu< /button >
          < NavLink className="button is-primary is-light side-button"
                    to='/login'
                    onClick={ this.handleLogout }> Logout < /NavLink >
        < /div >
      < /div >
    )
  }
}
