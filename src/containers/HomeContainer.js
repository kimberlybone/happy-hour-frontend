import React, { Component } from 'react';
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import '../HomeContainer.css';

export default class HomeContainer extends Component {

  state = {
    viewMenu: false
  }

  handleViewMenu = () => {
    this.setState({
      viewMenu: true
    })
  }

  render() {
    const { props:{ loggedInUserId, token }, handleViewMenu, } = this
    console.log(this.state.viewMenu)
    return (
      <div className="home-container">
        < SideBar loggedInUserId={ loggedInUserId }
                  token={ token }
                  viewMenu={ handleViewMenu }/>
                < MainContainer viewMenu={}/>
      </div>
    )
  }


}
