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


  render() {
    return (
      < div id='menu' >
      < div className='header-div' >
        < h1 >Happy Hour Menu< / h1 >
        < Filter
        categories={ this.props.categories }
        handleFilteredItems={ this.props.handleFilteredItems }
        />
      < /div>
        < div className='menu-items'>
          {this.renderMenuItems()}
        < / div >
        < div className='menu-close' >
          < button> Close < /button >
        < /div >
      < / div >
    )
  }
}
