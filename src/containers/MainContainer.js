import React, { Component,  } from 'react';
import '../MainContainer.css';
import Menu from '../components/Menu'
// import image from '~/happy-hour-frontend/public/Assets/cartoon-counter.jpg'

const URL = 'http://localhost:3000';

export default class MainContainer extends Component {

  state = {
    menuItems: [],
    filteredItems: []
  }

  mainDiv1Ref = React.createRef();
  mainDiv2Ref = React.createRef();


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

  blurDivs = shouldBlur => {
    const { mainDiv1Ref, mainDiv2Ref } = this;
    if (shouldBlur) {
      mainDiv1Ref.current.style.filter = 'blur(8px)';
      mainDiv2Ref.current.style.filter = 'blur(8px)';
    } else {
      mainDiv1Ref.current.style.filter = 'none';
      mainDiv2Ref.current.style.filter = 'none';
    }
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
            blurDivs } = this

    return (
      <div className="main-container">
        <div className="main-div" ref={ mainDiv1Ref }>< h1 style={{color: 'white', fontSize: 60 + 'px'}}> Happy Hour </ h1 ></div>
        <div className="main-div2" ref={ mainDiv2Ref }>
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
          blurDivs={ blurDivs }
          />
        : null
      }
      </div>
    )
  }
}
