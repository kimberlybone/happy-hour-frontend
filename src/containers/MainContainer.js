import React, { Component, Fragment } from 'react';
import '../stylesheets/MainContainer.css';
import Menu from '../components/Menu'
import BarSpot from '../components/BarSpot'

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
    const config = {
      headers: {
        'Authorization': token
      }
    }

    fetch(URL + '/recipes', config)
    .then(res => res.json())
    .then(menuItems => {
      this.setState({menuItems})
    })

  }

// MENU FUNCTIONS
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

// BAR STOOL METHOD
  renderBarSpots = () => {
    const {occupied, occupySpot, drinkUrl, consumeDrink} = this.props
    return (
      < Fragment >
        < BarSpot occupied={ occupied['bs1'] } occupySpot={ occupySpot } spotId='bs1' drinkUrl={ drinkUrl } consumeDrink={ consumeDrink }/>
        < BarSpot occupied={ occupied['bs2'] } occupySpot={ occupySpot } spotId='bs2' drinkUrl={ drinkUrl } consumeDrink={ consumeDrink }/>
        < BarSpot occupied={ occupied['bs3'] } occupySpot={ occupySpot } spotId='bs3' drinkUrl={ drinkUrl } consumeDrink={ consumeDrink }/>
        < BarSpot occupied={ occupied['bs4'] } occupySpot={ occupySpot } spotId='bs4' drinkUrl={ drinkUrl } consumeDrink={ consumeDrink }/>
        < BarSpot occupied={ occupied['bs5'] } occupySpot={ occupySpot } spotId='bs5' drinkUrl={ drinkUrl } consumeDrink={ consumeDrink }/>
      < / Fragment >
    )
  }

  render(){
    const { state: { menuItems, filteredItems },
            props: {
              loggedInUserId,
              token,
              updateBudget,
              user,
              handleCloseMenu,
              handleAddFavorite,
              errors,
              deleteFavorite,
              blurDivs
            },
            mainDiv1Ref,
            mainDiv2Ref,
            handleFilteredItems,
            getCategories,
            renderBarSpots } = this

    return (
      < div className="main-container">
        < div className="main-div" ref={ mainDiv1Ref }>
          < h1 className="main-title" >
            Happy Hour
          < / h1 >
          <iframe width="250" height="150"
                  src="https://www.youtube.com/embed/l4R-Yg82KqU?autoplay=1&start=4&loop=1&playlist=l4R-Yg82KqU"
                  title='tv-news'
                  frameBorder="0"
                  className="tv-news"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
                <iframe width="250" height="150"
                  src="https://www.youtube.com/embed/QTFK0exr7uQ?autoplay=1&start=15&loop=1&&playlist=QTFK0exr7uQ"
                  title='tv-news'
                  frameBorder="0"
                  className="tv-sports"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
        < / div>
        < div className="main-div2" ref={ mainDiv2Ref }>
          < div className="bar-stools" >
            { renderBarSpots() }
          < / div >
        < /div>
        {
          this.props.viewMenu
          ?
          < Menu
          menuItems={ filteredItems.length ? filteredItems : menuItems }
          loggedInUserId={ loggedInUserId }
          token={ token }
          user={ user }
          errors={ errors }
          handleFilteredItems={ handleFilteredItems }
          categories={ ['', ...getCategories()] }
          handleCloseMenu={ handleCloseMenu }
          handleAddFavorite={ handleAddFavorite }
          deleteFavorite={ deleteFavorite }
          updateBudget={updateBudget}
          blurDivs={ blurDivs }
          />
        : null
      }
      < /div>
    )
  }
}
