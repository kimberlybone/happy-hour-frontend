import React, { Component } from 'react';
import '../stylesheets/CreateDrink.css'
import Filter from '../components/Filter'

export default class CreateDrink extends Component {

  state = {
    category: '',
    drinkName: ''
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

  render(){
    console.log(this.props.location.filterProps)
    const { categories } = this.props.location.filterProps
    const { handleChange } = this
    return(
      < div className='create-div'>
        < div className='recipe-card'>
        Recipe Card
          < div className='card-header'>
              < form onChange={ handleChange }>
                Category: {<Filter categories={ categories }
                        handleChange={ this.handleChange }/>}

                Drink Name:<input type='text' name='drinkName'></input>
              < /form>
          < /div>
          < div className='card-main'>
          < div className='card-ingredients'> Card Ingredients < /div>
          < div className='search'>Search< /div>
          < /div>
          < div className='card-directions'>Card Directions< / div>
        < / div >
      < / div >
    )
  }
}
