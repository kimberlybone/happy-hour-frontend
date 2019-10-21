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

  render() {
    const {categories} = this.props
    console.log(categories)
    return (
      <div>
        Filter Drink By: < select onChange={}>
          {this.handleCategories()}
        < /select >
      </div>
    )
  }
}
