import React, { Component } from 'react';
import '../MainContainer.css';
import Menu from '../components/Menu'
// import image from '~/happy-hour-frontend/public/Assets/cartoon-counter.jpg'

const URL = 'http://localhost:3000';

export default class MainContainer extends Component {

  state = {
    menuItems: [],
    filteredItems: [],
    user: null,
    showFavorites: false
  }

  componentDidMount() {
    const { loggedInUserId, token } = this.props

    // fetch recipes
    fetch(URL + '/recipes', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(menuItems => {
      this.setState({menuItems})
    })

    // fetch user info
    fetch(URL + '/users/' + loggedInUserId, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then( user => this.setState({user}))
  }

  componentDidMount() {
    const { loggedInUserId, token } = this.props
    fetch(URL + '/users/' + loggedInUserId, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then( user => this.setState({user}))
  }

  handleFilteredItems = (category) => {
    const {menuItems} = this.state
    if(category !== 'All'){
      this.setState({
        filteredItems: menuItems.filter( item => category === item.category )
      })
    } else {
      this.setState({filteredItems: menuItems})
    }
  }

  getCategories = () => {
    const {menuItems} = this.state
    const categories = menuItems.map(item => item.category)
    return categories.filter((item, index) => categories.indexOf(item) === index)
  }

  render(){
    const { state: { menuItems, filteredItems },
            props: { loggedInUserId, handleCloseMenu }, handleFilteredItems,
            getCategories } = this
    return (
      <div className="main-container">
        <div className="main-div">< h1 style={{color: 'white', fontSize: 60 + 'px'}}> Happy Hour </ h1 ></div>
        <div className="main-div2">
          <div className="bar-counter">Bar Counter</div>
            <div className="bar-stools">Bar Stools</div>
        </div>
        {
          this.props.viewMenu
          ?
          < Menu
          menuItems={ filteredItems.length ? filteredItems : menuItems }
          loggedInUserId={ loggedInUserId }
          handleFilteredItems={ handleFilteredItems }
          categories={ getCategories() }
          handleCloseMenu={ handleCloseMenu }
          />
        : null
      }
      </div>
    )
  }
}
