import React, { Component } from 'react';

export default class Menu extends Component {

  renderMenuItems = () => {
    return this.props.menuItems.map(item => {
      return< li >{item.name}</ li >
    })
  }

  render() {
    return (
      < div id='menu' >
        {this.renderMenuItems()}
      </ div >
    )
  }
}
