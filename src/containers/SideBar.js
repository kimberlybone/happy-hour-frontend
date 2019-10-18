import React, { Component, Fragment } from 'react';
import '../SideBar.css';
import User from '../components/User'

export default class SideBar extends Component {
  render(){
    const {user} = this.props

    return (
      <div className="side-bar">
        <User user={user}/>
        <div>
          Favorites <br></br>
          View Menu</div>
      </div>
    )
  }
}
