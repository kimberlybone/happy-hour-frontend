import React, { Component, Fragment } from 'react';

export default class Menu extends Component {

  renderMenuItems = () => {
    const { menuItems } = this.props;
    return menuItems.map(item => {
      const { id, name, price, ingredients } = item;
      const ingredientList = ingredients.map(ingredient => ingredient.name)
      return (
        < Fragment key={ id } >
          < li className='menu-item'>{name} - ${price}</ li >
          < p className='ingredients'>{ ingredientList.join(', ') }</ p >
        </ Fragment >
      )
    })
  }

  render() {
    return (
      < div id='menu' >
        < h1 >Happy Hour Menu</ h1 >
        < ul className='menu-items'>
          {this.renderMenuItems()}
        </ ul >
      </ div >
    )
  }
}
