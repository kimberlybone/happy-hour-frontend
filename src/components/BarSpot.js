import React, { Component } from 'react';

export default class BarSpot extends Component {

  // state = {
  //   occupied: false
  // }
  //
  // handleBarStoolClick = () => {
  //   if(this.state.occupied === false ){
  //     this.setState({
  //       occupied: true
  //     })
  //
  //   } else {
  //     return null
  //   }
  // }



  render() {
    const { spotId, occupied, occupySpot } = this.props
    return (
      < div className={ `bar-spot ${spotId}` } >

      {
        occupied ?
        < img src={require('../Assets/brian-6.png')} alt='person' className={`person ${spotId}`} />
        :
        < img src={require('../Assets/bar-stool-2.png')}
              alt='bar-stool'
              onClick={ () => occupySpot(spotId) }
              className={ `bar-stool ${spotId}` } />
      }
      < / div >
    )
  }

}
