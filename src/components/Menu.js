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
          < ul className='menu-item'>{name} - ${price}< / ul >
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
        < h1 style={{ fontSize: 30 + 'px' }}>Happy Hour Menu
          < img src="https://media.giphy.com/media/1wmcMq0R4aYpRpqvkL/giphy.gif" alt="gif" className='menu-gif'>
          < /img >
        < / h1 >
        {/*< img src="https://media.giphy.com/media/1wmcMq0R4aYpRpqvkL/giphy.gif" alt="gif" className='menu-gif'>< /img >*/}
        < Filter
        categories={ categories }
        handleFilteredItems={ handleFilteredItems }
        />
      < /div>
        < div className='menu-items'>
          { renderMenuItems() }
        < / div >
        < div className='menu-close' >
          < button className="side-button" onClick={ handleCloseMenu }> Close < /button >
        < /div >
      < / div >
    )
  }
}
