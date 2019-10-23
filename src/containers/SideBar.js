import React, { Component } from 'react';
import '../stylesheets/SideBar.css';
import User from '../components/User'
import Favorite from '../components/Favorite'

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
          { showFavorites ? getFavorites() : null }
          < br >< /br >
          < button className="button is-primary is-light side-button" onClick={ viewMenu }>View Menu< /button >
        < /div >
      < /div >
    )
  }
}
