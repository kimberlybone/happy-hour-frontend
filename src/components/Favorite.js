import React from 'react';

const Favorite = (props) => {
  const {recipe} = props
  // console.log(recipe)
  return(<div className='favorite-list'>{recipe.name} - ${recipe.price}</div>)
}
export default Favorite
