import React, { Component, Fragment } from 'react';
import Filter from './Filter'

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
        < / Fragment >
      )
    })
  }

  getCategories = () => {
    const {menuItems} = this.props
    const categories = menuItems.map(item => item.category)
    return categories.filter((item, index) => categories.indexOf(item) === index)
  }

  render() {
    return (
      < div id='menu' >
        < h1 >Happy Hour Menu</ h1 >
        < Filter categories={ this.getCategories() }/>
        < ul className='menu-items'>
          {this.renderMenuItems()}
        < / ul >
      < / div >
    )
  }
}
