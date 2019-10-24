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
        < img src='https://images.vexels.com/media/users/3/146416/isolated/preview/c613c6b5667864f564324ff2fd59f184-man-drinking-silhouette-by-vexels.png' alt='person' className={`person ${spotId}`} />
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
