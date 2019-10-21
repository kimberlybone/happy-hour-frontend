import React, { Component, Fragment } from 'react';

export default class Menu extends Component {

  renderMenuItems = () => {
    const { menuItems } = this.props;
    return menuItems.map(item => {
      const { name, price, ingredients } = item;
      const ingredientList = ingredients.map(ingredient => ingredient.name)
      return (
        < Fragment >
          < li >{name} - ${price}</ li >
          < p >{ ingredientList.join(', ') }</ p >
        </ Fragment >
      )
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
