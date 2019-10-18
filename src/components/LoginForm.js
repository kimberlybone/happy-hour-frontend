import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom'

export default class LoginForm extends Component {

  state = {
    name: '',
    password: '',
    age: '',
    budget: ''
  }

  renderForm = () => {
    const { props: {isReturningUser}, onFormChange, renderSignUpForm, formSubmit,
            state: {name, password}} = this;
    return (
      < form onChange={ onFormChange } onSubmit={formSubmit}>
        Name: < input
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                value={name}/>
        Password: < input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={password}/>
        { !isReturningUser ? renderSignUpForm() : null }
        < input type='submit' />
      </ form >
    )
  }

  renderSignUpForm = () => {
    const {state: {age, budget}} = this
    return (
      < Fragment >
        Age: < input
                type='number'
                id='age'
                name='age'
                placeholder='Age'
                value={age}/>
      Budget: $< input
                  type='number'
                  id='budget'
                  name='budget'
                  placeholder='Budget'value={budget}/>
      </ Fragment >
    )
  }

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formSubmit = (e) => {
    e.preventDefault()

    const {state: {name, password, age, budget},
           props: {isReturningUser, onSubmitLogIn, onSubmitSignUp}}
           = this

    isReturningUser ?
    onSubmitLogIn({name, password})
    :
    onSubmitSignUp({name, password, age, budget})
    this.setState({
      name: '',
      password: '',
      age: '',
      budget: ''
    })
  }

  render() {
    const { props: {isReturningUser}, renderForm } = this;
    console.log(isReturningUser);
    return (

      < div >
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
        { renderForm() }
      </ div >
    )
  };


};
