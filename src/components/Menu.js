import React, { Component, Fragment } from 'react';
import Filter from './Filter'

const URL = 'http://localhost:3000';

export default class Menu extends Component {

  renderMenuItems = () => {
    const { props: {menuItems}, handleAddFavorite } = this;
    return menuItems.map(item => {
      const { id, name, price, ingredients } = item;
      const ingredientList = ingredients.map(ingredient => ingredient.name)
      return (
        < Fragment key={ id } >
          < ul className='menu-item'>{name} - ${price}<span onClick={ () => handleAddFavorite(id) }>♥</span>< / ul >
          < p className='ingredients'>{ ingredientList.join(', ') }< / p >
        < / Fragment >
      )
    })
  }

  handleAddFavorite = id => {
    const { loggedInUserId, token } = this.props;
    const config = {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'recipe_id': id,
        'user_id': loggedInUserId
      })
    }
    fetch(URL + '/favorites', config)
    .then(res => res.json())
    .then(console.log)
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
