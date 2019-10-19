import React, { Component } from 'react';
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import '../HomeContainer.css';

export default class HomeContainer extends Component {





  render() {
    const {user} = this.props
    return (
      <div className="home-container">
        < SideBar user={user}/>
        < MainContainer />
      </div>
    )
  }


}
