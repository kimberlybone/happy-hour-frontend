import React, { Component } from 'react';
import '../MainContainer.css';
import Menu from '../components/Menu'

const URL = 'http://localhost:3000';

export default class MainContainer extends Component {

  state = {
    menuItems: [],
    filteredItems: []
  }

  componentDidMount() {
    const { token } = this.props
    fetch(URL + '/recipes', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(menuItems => {
      // console.log(menuItems.slice(0,5));
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
    const { state: { menuItems, filteredItems }, handleFilteredItems, getCategories } = this
    return (
      <div className="main-container">
        <div className="main-div">< h1 style={{color: 'white'}}> Happy Hour </ h1 ></div>
        <div className="main-div2">MC2</div>
        {
          this.props.viewMenu
          ?
            < Menu
                menuItems={ filteredItems.length ? filteredItems : menuItems }
                handleFilteredItems={ handleFilteredItems }
                categories={ getCategories() }
             />
            : null
          }
      </div>
    )
  }
}
