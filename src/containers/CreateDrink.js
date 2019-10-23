import React, { Component } from 'react';
import '../stylesheets/CreateDrink.css'
import Filter from '../components/Filter'

const URL = 'http://localhost:3000'

export default class CreateDrink extends Component {

  state = {
    allIngredients: [],
    search: '',
    category: '',
    drinkName: '',
    ingredientsList: []
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleCreateDrinkCategory = () => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  handleIngredientClick = e => {
    console.log(e.target);
    console.log(e.target.innerText);
    const ingredientName = e.target.innerText;
    const { ingredientsList } = this.state

    if (ingredientsList.length < 5 && !ingredientsList.includes(ingredientName)) {
      this.setState(prevState => {
        return {ingredientsList: [...prevState.ingredientsList, ingredientName]}
      })
    } else {
      return null
    }
  }

  displayIngredients = () => {
    const { ingredientsList } = this.state;
    return ingredientsList.map(ingredient => < li >{ ingredient }< / li >)
  }

  filteredIngredients = () => {
    const { state: {allIngredients, search}, handleIngredientClick } = this
    const ingredients = allIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(search.toLowerCase()))
    return ingredients.map(ingredient => {
      const { id, name } = ingredient
      return < li key={id}
                  id={ id }
                  onClick={ (e) => handleIngredientClick(e) } >
                  { name }
              < /li >
    })
  }

  componentDidMount() {
    fetch(URL + '/ingredients')
    .then(res => res.json())
    .then(allIngredients => this.setState({allIngredients}))
  }

  render(){
    console.log(this.props.location.filterProps)
    const { categories } = this.props.location.filterProps || {categories: ['margarita', 'mojito']}
    const { handleChange, filteredIngredients, displayIngredients } = this
    const { drinkName, search } = this.state
    return(
      < div className='create-div'>
        < div className='recipe-card'>
        Recipe Card
          < div className='card-header'>
              < form onChange={ handleChange }>
                {<Filter categories={ categories }
                        handleChange={ this.handleChange }/>}

                Drink Name:<input type='text' name='drinkName' value={ drinkName }></input>
              < /form>
          < /div>
          < div className='card-main'>
          < div className='card-ingredients'>
            Card Ingredients
            { displayIngredients() }
          < /div>
          < div className='search'>
            Search: <input type='search' name='search' onChange={ handleChange } value={ search }></input>
            < ul >
              { filteredIngredients() }
            < /ul >
          < /div>
          < /div>
          < div className='card-directions'>Card Directions< / div>
        < / div >
      < / div >
    )
  }
}
