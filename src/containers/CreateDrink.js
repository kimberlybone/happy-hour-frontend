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
    showGIF: false
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
      this.setState({
        showGIF: true
      })
        setTimeout(() => {
          this.setState({showGIF:false}, () => alert(`Your ${recipe.name} has been created!`))
          goHome()
        }, 3000)
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
    const { drinkName, search, directions, ingredientsList } = this.state
    return(
      < div className='create-div'>
        < div className='recipe-card'>
        {
          this.state.showGIF ? <img className='shaker-gif' src='https://media.giphy.com/media/1dHxZ4aEUjKQBbtN5Z/giphy.gif' alt='gif'/> : null
        }
        < h3 className='card-main-title'>< span >< img src='https://cdn.shopify.com/s/files/1/0818/5369/files/Snowe_martinigif4_979b247b-1837-44d7-8beb-b307603f72cb.gif?11560714014684638141' alt='gif' className='card-gif'/>< /span > Make Your Recipe < / h3 >
          < div className='card-header'>
              < form onChange={ handleChange }>
                {<Filter categories={ categories }
                        handleChange={ this.handleChange }/>}

                < h3 className='form-label' >What's your drink's name?< /h3>< input type='text' name='drinkName' value={ drinkName }>< /input>
              < /form>
          < /div>
          < div className='card-main'>
          < div className='card-ingredients'>
            < h3 className='card-title'> Your Card Ingredients </h3>
          < ul className='display-ingredients'>
              { !ingredientsList.length ? <p className='placeholder'>Search and Click to add ingredients to your recipe...</p> : displayIngredients() }
            < / ul >
          < /div>
          < div className='search'>
            <h3 className='card-title'>Search for Ingredients:</h3> <input type='search' name='search' onChange={ handleChange } value={ search }></input>
            < ul className='ingredients-search-list' >
              { filteredIngredients() }
            < /ul >
          < /div>
          < /div>
          < div className='card-directions'>
            < h3 className='card-title'>Write your Recipe Directions Below:< /h3>

            < textarea className='directions-text'
                        onChange={ handleChange }
                        name='directions'
                        value={ directions }/>
            < br />
          < button className='button is-primary is-light side-button' onClick={ handleCreateDrink } >Create Your Drink!< / button>
          < / div>
        < / div >
      < / div >
    )
  }
}
