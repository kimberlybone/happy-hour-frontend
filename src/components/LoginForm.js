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
    const { props: {isReturningUser, errors}, onFormChange, renderSignUpForm, formSubmit, renderErrors,
            state: {name, password}} = this;
    return (
      < form onChange={ onFormChange } onSubmit={formSubmit}>
      { errors ? renderErrors() : null }
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control has-icons-left has-icons-right'>
          < input
          className='input is-success'
          type='text'
          id='name'
          name='name'
          placeholder='Name'
          value={name}/>
        <span className='icon is-small is-left'>
          <i className='fas fa-user'></i>
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-check'></i>
          </span>
        </div>
        <p className='help is-success'>This name is available</p>
      </div>

      <div class="field">
        <label className='label'>Password</label>
          <div class="control has-icons-left">
            < input
            className='input'
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={password}/>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      { !isReturningUser ? renderSignUpForm() : null }
      < input type='submit' />
      </ form >
    )
  }

  renderSignUpForm = () => {
    const {state: {age, budget}} = this
    return (
      < Fragment >
      <div className='field'>
        <label className='label'>Age</label>
        <div className='control has-icons-left has-icons-right'>
          < input
                className='input'
                type='number'
                id='age'
                name='age'
                placeholder='Age'
                value={age}/>
            <span class="icon is-small is-left">
              <i class="fas fa-cocktail"></i>
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Budget</label>
          <div className='control has-icons-left has-icons-right'>
            < input
                  className='input'
                  type='number'
                  id='budget'
                  name='budget'
                  placeholder='Budget'value={budget}/>
              <span class="icon is-small is-left">
                <i class="fas fa-dollar-sign"></i>
              </span>
            </div>
          </div>
      </ Fragment >
    )
  }

  renderErrors = () => {
    return this.props.errors.map(error => error)
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

      < div className='form-div'>
        < h1 >Happy Hour</ h1 >
        <NavLink to='/login' activeClassName="active" className="link">Log In</NavLink>
        <NavLink to='/signup' activeClassName="active" className="link">Sign Up</NavLink>
        { renderForm() }
      </ div >
    )
  };


};
