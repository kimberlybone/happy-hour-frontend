import React, { Component } from 'react';

export default class BarSpot extends Component {

  state = {
    occupied: false
  }

  render() {
    const { spotId } = this.props
    return (
      < div className={ `bar-spot ${spotId}` } >

      < / div >
    )
  }

}
