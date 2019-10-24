import React, { Component } from 'react';
import '../stylesheets/CreateDrink.css'
import Filter from '../components/Filter'

const URL = 'http://localhost:3000'

// default categories list
const defaultCategories = ['', 'fizz', 'daiquiri', 'brandy', 'rum', 'long_island', 'negroni', 'martini', 'margarita', 'gin', 'sidecar', 'sour', 'punch', 'tequila', 'mojito', 'smash', 'mule', 'flip', 'colada', 'vodka', 'collins', 'manhattan', 'bloody', 'cosmopolitan']

export default class CreateDrink extends Component {

  state = {
    allIngredients: [],
    search: '',
    category: '',
    drinkName: '',
    ingredientsList: [],
    directions: '',
  }

  handleChange = e => {
    if (e.target.value.length < 500) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }


  handleIngredientClick = e => {
    // console.log(e.target);
    // console.log(e.target.innerText);
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

  handleCreateDrink = () => {
    const { props: {
              goHome
              // location: {
              //   filterProps: {loggedInUserId, token}
              // }
            },
            state: {
              category,
              drinkName,
              ingredientsList,
              directions
            } } = this;
      // console.log(loggedInUserId)
    const config = {
      method: 'POST',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'name': drinkName,
        'category': category,
        'ingredients': ingredientsList,
        'instructions': directions,
        'user_id': localStorage.loggedInUserId
      })
    }

    fetch(URL + '/recipes', config)
    .then(res => res.json())
    .then(recipe => {
      alert(`Your ${recipe.name} has been created!`)
      goHome()
    })
  }

  displayIngredients = () => {
    const { ingredientsList } = this.state;
    return ingredientsList.map(ingredient => < li key={ingredient} >{ ingredient }< / li >)
  }

  filteredIngredients = () => {
    const { state: {allIngredients, search}, handleIngredientClick } = this
    const ingredients = allIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(search.toLowerCase()))
    return ingredients.map(ingredient => {
      const { id, name } = ingredient
      return < li key={id}
                  id={ id }
                  className='ingredient-suggestion'
                  onClick={ (e) => handleIngredientClick(e) } >
                  { name }
              < /li >
    })
  }

  componentDidMount() {
    // const { token } = this.props.location.filterProps
    const config = {
      headers: {
        'Authorization': localStorage.token
      }
    }
    fetch(URL + '/ingredients', config)
    .then(res => res.json())
    .then(allIngredients => this.setState({allIngredients}))
  }

  render(){
    const { categories } = this.props.location.filterProps || {categories: defaultCategories}
    const { handleChange, filteredIngredients, displayIngredients, handleCreateDrink } = this
    const { drinkName, search, directions } = this.state
    return(
      < div className='create-div'>
        < div className='recipe-card'>
        < h1 >Recipe Card< / h1 >
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
            < ul >
              { displayIngredients() }
            < / ul >
          < /div>
          < div className='search'>
            Search: <input type='search' name='search' onChange={ handleChange } value={ search }></input>
            < ul className='ingredients-search-list' >
              { filteredIngredients() }
            < /ul >
          < /div>
          < /div>
          < div className='card-directions'>
            Card Directions
            < br />
            < textarea className='directions-text'
                        onChange={ handleChange }
                        name='directions'
                        value={ directions }/>
            < br />
          < button onClick={ handleCreateDrink } >Create Drink< / button>
          < / div>
        < / div >
      < / div >
    )
  }
}
