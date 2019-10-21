import React, { Component } from 'react';
import '../MainContainer.css';
import Menu from '../components/Menu'

export default class MainContainer extends Component {

  render(){
    return (
      <div className="main-container">
        <div className="main-div">< h1 style={{color: 'white'}}> Happy Hour </ h1 ></div>
        <div className="main-div2">MC2</div>
        { this.props.viewMenu ? < Menu /> : null }
      </div>
    )
  }
}
