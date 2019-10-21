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

  render(){
    const { state: { menuItems, filteredItems }, handleFilteredItems } = this
    return (
      <div className="main-container">
        <div className="main-div">< h1 style={{color: 'white'}}> Happy Hour </ h1 ></div>
        <div className="main-div2">MC2</div>
        { this.props.viewMenu ? < Menu menuItems={ menuItems } handleFilteredItems={ handleFilteredItems }/> : null }
      </div>
    )
  }
}
