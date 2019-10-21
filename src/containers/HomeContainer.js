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

  handleCloseMenu = () => {
    this.setState({
      viewMenu: false
    })
  }

  render() {
    const { props:{ loggedInUserId, token },
            state:{ viewMenu }, handleCloseMenu, handleViewMenu } = this
    // console.log(this.state.viewMenu)
    return (
      <div className="home-container">
        < SideBar
            loggedInUserId={ loggedInUserId }
            token={ token }
            viewMenu={ handleViewMenu }
            />
        < MainContainer
            viewMenu={ viewMenu }
            token={ token }
            handleCloseMenu={ handleCloseMenu }
            />
      </div>
    )
  }


}
