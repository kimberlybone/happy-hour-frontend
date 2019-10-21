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
    this.props.handleFilteredItems(e.target.value)
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        Filter Drink By: < select onChange={this.handleChange}>
          {this.handleCategories()}
        < /select >
      </div>
    )
  }
}
