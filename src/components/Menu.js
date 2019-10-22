import React, { Component, Fragment } from 'react';
import Filter from './Filter'

const URL = 'http://localhost:3000';

export default class Menu extends Component {

  renderMenuItems = () => {
    const { props: {user, menuItems, handleAddFavorite} } = this;
    const favRecipeIds = user.favorites.map(favorite => favorite.recipe.id)

    return menuItems.map(item => {
      const { id, name, price, ingredients } = item;
      const ingredientList = ingredients.map(ingredient => ingredient.name)
      const className = favRecipeIds.includes(id) ? 'heart favorite' : 'heart non-favorite'

      return (
        < Fragment key={ id } >
          < ul className='menu-item'>
            {name} - ${price}
            <span className={ className } onClick={ () => handleAddFavorite(id) }>
              { favRecipeIds.includes(id) ? ' ♥' : ' ♡'}
          </span>< / ul >
          < p className='ingredients'>{ ingredientList.join(', ') }< / p >
        < / Fragment >
      )
    })
  }

  render() {
    const { props: {
              handleCloseMenu,
              categories,
              handleFilteredItems }, renderMenuItems} = this
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
