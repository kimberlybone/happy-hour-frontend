import React, { Component } from 'react';

export default class BarSpot extends Component {

  state = {
    occupied: false
  }

  render() {
    const { spotId } = this.props
    return (
      < div className={ `bar-spot ${spotId}` } >
        < img src={require('../Assets/bar-stool-2.png')}
              alt='bar-stool'
              className={ `bar-stool ${spotId}` } />
      < / div >
    )
  }

}
