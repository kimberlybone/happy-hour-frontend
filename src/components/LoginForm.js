import React, { Component, Fragment } from 'react';

export default class LoginForm extends Component {

  state = {
    name: '',
    password: '',
    age: '',
    budget: ''
  }

  renderForm = () => {
    const { props: {isReturningUser}, onFormChange, renderSignUpForm, formSubmit } = this;
    return (
      < form onChange={ onFormChange } onSubmit={formSubmit}>
        Name: < input type='text' id='name' name='name' />
        Password: < input type='password' id='password' name='password' />
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

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formSubmit = (e) => {
    const {name, password, age, budget} = this.state
    e.preventDefault()
    this.props.onSubmitLogIn({name, password})
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
