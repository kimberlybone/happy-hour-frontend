import React, { Component } from 'react'

export default class Filter extends Component {

  handleCategories = () => {
    const {categories} = this.props
    return categories.map(category => {
      return (
          < option key={category} value={category}>{category}< /option >
      )
    })
  }

  handleChange = e => {
    if(this.props.handleFilteredItems){
      this.props.handleFilteredItems(e.target.value)
    } else {
      this.props.handleChange(e)
    }
  }

  render() {
    return (
      <div>
        <h3 className='form-label'> Choose Category: </h3>< select onChange={this.handleChange} name='category'>
          {this.handleCategories()}
        < /select >
      </div>
    )
  }
}
