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
          < li className='menu-item'>{name} - ${price}< / li >
          < p className='ingredients'>{ ingredientList.join(', ') }< / p >
        < / Fragment >
      )
    })
  }



  render() {
    const { props: { handleCloseMenu, categories, handleFilteredItems }, renderMenuItems} = this
    return (
      < div id='menu' >
      < div className='header-div' >
        < h1 >Happy Hour Menu< / h1 >
        < Filter
        categories={ categories }
        handleFilteredItems={ handleFilteredItems }
        />
      < /div>
        < div className='menu-items'>
          { renderMenuItems() }
        < / div >
        < div className='menu-close' >
          < button onClick={ handleCloseMenu }> Close < /button >
        < /div >
      < / div >
    )
  }
}
