import React, { Component, Fragment } from 'react';
import '../stylesheets/MainContainer.css';
import Menu from '../components/Menu'
import BarSpot from '../components/BarSpot'

// import image from '~/happy-hour-frontend/public/Assets/cartoon-counter.jpg'

const URL = 'http://localhost:3000';

export default class MainContainer extends Component {

  state = {
    menuItems: [],
    filteredItems: []
  }

  mainDiv1Ref = React.createRef();
  mainDiv2Ref = React.createRef();


// FETCH RECIPES
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

  blurDivs = shouldBlur => {
    const { mainDiv1Ref, mainDiv2Ref } = this;
    if (shouldBlur) {
      mainDiv1Ref.current.style.filter = 'blur(8px)';
      mainDiv2Ref.current.style.filter = 'blur(8px)';
      mainDiv1Ref.current.style.transitionDuration = 0.8 + 's'
      mainDiv2Ref.current.style.transitionDuration = 0.8 + 's'
    } else {
      mainDiv1Ref.current.style.filter = 'none';
      mainDiv2Ref.current.style.filter = 'none';
    }
  }

  renderBarSpots = () => {
    // debugger
    return (
      < Fragment >
        < BarSpot spotId='bs1' />
        < BarSpot spotId='bs2' />
        < BarSpot spotId='bs3' />
        < BarSpot spotId='bs4' />
        < BarSpot spotId='bs5' />
      < / Fragment >
    )
  }

  render(){
    const { state: { menuItems, filteredItems },
            props: {
              loggedInUserId,
              updateBudget,
              user,
              handleCloseMenu,
              handleAddFavorite,
              errors,
              deleteFavorite
            },
            mainDiv1Ref,
            mainDiv2Ref,
            handleFilteredItems,
            getCategories,
            blurDivs,
            renderBarSpots } = this

    return (
      <div className="main-container">
        < div className="main-div" ref={ mainDiv1Ref }>
          < h1 className="main-title" >
            Happy Hour
          < / h1 >
        < / div>
        < div className="main-div2" ref={ mainDiv2Ref }>
          < div className="bar-counter">

          < / div >
          < div className="bar-stools" >
            { renderBarSpots() }
          < / div >
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
          blurDivs={ blurDivs }
          />
        : null
      }
      </div>
    )
  }
}
