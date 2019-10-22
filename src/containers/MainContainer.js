import React, { Component } from 'react';
import '../MainContainer.css';
import Menu from '../components/Menu'
// import image from '~/happy-hour-frontend/public/Assets/cartoon-counter.jpg'

const URL = 'http://localhost:3000';

export default class MainContainer extends Component {

  state = {
    menuItems: [],
    filteredItems: []
  }

  // fetch recipes
  componentDidMount() {
    const { token } = this.props

    fetch(URL + '/recipes', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(menuItems => {
      this.setState({menuItems})
    })

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
            props: { loggedInUserId, updateBudget,
              user,
              handleCloseMenu,
              handleAddFavorite,
              errors, deleteFavorite },
              handleFilteredItems,
              getCategories} = this

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
          user={ user }
          errors={ errors }
          handleFilteredItems={ handleFilteredItems }
          categories={ getCategories() }
          handleCloseMenu={ handleCloseMenu }
          handleAddFavorite={ handleAddFavorite }
          deleteFavorite={ deleteFavorite }
          updateBudget={updateBudget}
          />
        : null
      }
      </div>
    )
  }
}
