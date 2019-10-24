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

  renderBarSpot = () => {
    const { spotId, occupied, occupySpot, drinkUrl, consumeDrink } = this.props

    const leftPos = `${parseInt(spotId.split('')[2])*10 + 5}%`

    if (occupied) {
      return (
        <React.Fragment>
          < img src={require('../Assets/brian-6.png')} alt='person' className={`person ${spotId}`} />
        { drinkUrl ? < img className='drink-pic' style={{left: `${leftPos}`}} src={ drinkUrl } alt='drink' onClick={ consumeDrink } /> : null }
        </React.Fragment>
      )
    } else {
      return < img src={require('../Assets/bar-stool-2.png')}
      alt='bar-stool'
      onClick={ () => occupySpot(spotId) }
      className={ `bar-stool ${spotId}` } />
    }

  }

  render() {
    const { props: { spotId }, renderBarSpot } = this

    return (
      < div className={ `bar-spot ${spotId}` } >

      { renderBarSpot() }

      {/*
        occupied ?
        < img src={require('../Assets/brian-6.png')} alt='person' className={`person ${spotId}`} />
      <
        :
        < img src={require('../Assets/bar-stool-2.png')}
              alt='bar-stool'
              onClick={ () => occupySpot(spotId) }
              className={ `bar-stool ${spotId}` } />
      */}
      < / div >
    )
  }

}
