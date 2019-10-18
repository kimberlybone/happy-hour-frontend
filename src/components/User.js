import React, {Component} from 'react'

export default class User extends Component {
  render(){
    const {user: {name, age, budget }} = this.props

    return (
      <div className="user-div">
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <li>Budget: ${budget}</li>
      </ul>
      </div>

    )
  }
}
