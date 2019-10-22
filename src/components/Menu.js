import React, { Component, Fragment } from 'react';
import Filter from './Filter'
import {NavLink} from 'react-router-dom'

// const URL = 'http://localhost:3000';

export default class Menu extends Component {

  findFavoriteId = (id) => {
    const { props: { user } } = this;
    let favorite = user.favorites.find(favorite => favorite.recipe.id === id)
    return favorite.id
  }


  renderMenuItems = () => {
    const { props: {user,
                    menuItems,
                    handleAddFavorite,
                    updateBudget,
                    deleteFavorite},
                    findFavoriteId } = this;

    const favRecipeIds = user.favorites.map(favorite => favorite.recipe.id)

    return menuItems.map(item => {
      const { id, name, price, ingredients, user_name } = item;
      const ingredientList = ingredients.map(ingredient => ingredient.name)
      const className = favRecipeIds.includes(id) ? 'heart favorite' : 'heart non-favorite'

      return (
        < Fragment key={ id } >
          < ul className='menu-item'>
            < span className='item-name' onClick={() => updateBudget(user, item)}>{name} < /span> - ${price}
            < span className={ className } onClick={ favRecipeIds.includes(id) ?  () => deleteFavorite(findFavoriteId(id)) : () => handleAddFavorite(id)}>
              { favRecipeIds.includes(id) ? ' ♥' : ' ♡'}
          < /span>
          < p style={{fontSize: 8}}>Made By: {user_name}< /p>
          < / ul >
          < p className='ingredients'>{ ingredientList.join(', ') }< / p >
        < / Fragment >
      )
    })
  }

  componentDidMount() {
    this.props.blurDivs(true);
  }

  componentWillUnmount() {
    this.props.blurDivs(false);
  }

  render() {
    const { props: {
              handleCloseMenu,
              categories,
              handleFilteredItems,
              errors}, renderMenuItems} = this

    return (
      < div id='menu' >
      < div className='header-div' >
        < h1 style={{ fontSize: 30 + 'px' }}>Happy Hour Menu
          < img src="https://media.giphy.com/media/1wmcMq0R4aYpRpqvkL/giphy.gif" alt="gif" className='menu-gif'>
          < /img >
        < / h1 >
        < Filter
        categories={ categories }
        handleFilteredItems={ handleFilteredItems }
        />
        { errors.length ? < p className='error' >{ errors }< / p > : null }
      < /div>
        < div className='menu-items'>
          { renderMenuItems() }
        < / div >
        < div className='menu-close' >
          < button className="side-button" onClick={ handleCloseMenu }> Close < /button >
          < NavLink to='/create-drink' className='side-button' onClick={null}> Create Your Own Drink < /NavLink>
        < /div >
      < / div >
    )
  }
}
