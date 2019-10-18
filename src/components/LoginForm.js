import React, { Component, Fragment } from 'react';

export default class LoginForm extends Component {

  state = {
    name: '',
    budget: '',
    age: '',
    budget: ''
  }

  renderForm = () => {
    const { props: {isReturningUser}, onFormChange, renderSignUpForm } = this;
    return (
      < form onChange={ onFormChange }>
        Name: < input type='text' id='name' name='name' />
        Password: < input type='text' id='password' name='password' />
        { !isReturningUser ? renderSignUpForm() : null }
        < input type='submit' />
      </ form >
    )
  }

  renderSignUpForm = () => {
    return (
      < Fragment >
        Age: < input type='number' id='age' name='age' />
        Budget: $< input type='number' id='budget' name='budget' />
      </ Fragment >
    )
  }

  onFormChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const { props: {isReturningUser}, renderForm } = this;
    console.log(isReturningUser);
    return (

      < div >
        { renderForm() }
      </ div >
    )
  };


};
