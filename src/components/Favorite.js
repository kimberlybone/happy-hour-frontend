import React from 'react';

const Favorite = (props) => {
  const{recipe} = props
  console.log(recipe)
  return(<div>{recipe.name} - ${recipe.price}</div>)
}
export default Favorite
