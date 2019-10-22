import React, { Component } from 'react';
import '../SideBar.css';
import User from '../components/User'
import Favorite from '../components/Favorite'

// const URL = 'http://localhost:3000'

export default class SideBar extends Component {

  // state = {
  //   user: null,
  //   showFavorites: false
  // }

  // componentDidMount() {
  //   const { loggedInUserId, token } = this.props
  //   fetch(URL + '/users/' + loggedInUserId, {
  //     headers: {
  //       'Authorization': token
  //     }
  //   })
  //   .then(res => res.json())
  //   .then( user => this.setState({user}))
  // }

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

  // handleFavorites = () => {
  //   this.setState(prevState => {
  //     return {showFavorites: !prevState.showFavorites }
  //   })
  // }


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
        < div >
        < button className="side-button" onClick={ handleFavorites }> { showFavorites ? "Close" : "Favorites"} < /button >
          { showFavorites ? getFavorites() : null }
          < br >< /br >
          < button className="side-button" onClick={ viewMenu }>View Menu< /button >
        < /div >
      < /div >
    )
  }
}
