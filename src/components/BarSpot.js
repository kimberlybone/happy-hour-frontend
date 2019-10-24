import React, { Component } from 'react';

export default class BarSpot extends Component {

  state = {
    occupied: false
  }

  handleBarStoolClick = () => {
    if(this.state.occupied === false ){
      this.setState({
        occupied: true
      })

    } else {
      return null
    }
  }



  render() {
    const { spotId } = this.props
    return (
      < div className={ `bar-spot ${spotId}` } >

      {
        this.state.occupied ?
        < img src={require('../Assets/bar-guy.png')} alt='person' className={`person ${spotId}`} />
        :
        < img src={require('../Assets/bar-stool-2.png')}
              alt='bar-stool'
              onClick={ this.handleBarStoolClick }
              className={ `bar-stool ${spotId}` } />
      }
      < / div >
    )
  }

}
