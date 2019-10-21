import React, { Component } from 'react';
import '../SideBar.css';
import User from '../components/User'

export default class SideBar extends Component {

  state = {

  }

  componentDidMount() {
    const { loggedInUserId, token } = this.props
    fetch()
  }

  render(){
    const {user} = this.props

    return (
      < div className="side-bar" >
        < User user={user} />
        < div >
          < button onClick={ null }>Favorites< /button >
          < br >< /br >
          < button onClick={ null }>View Menu< /button >
        < /div >
      < /div >
    )
  }
}
