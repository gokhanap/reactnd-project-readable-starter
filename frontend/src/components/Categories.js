import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, fetchCategories, receiveCategories } from '../actions'
// import * as theAPI from '../theAPI.js'


export class Categories extends Component {

  handle = () => {
    this.props.addPost({})
  }

  componentWillMount() {
    // this.props.fetchCategories({})
  }


  render() {

    const { categories } = this.props

    // console.log("props", this.props);
    return (
        <ul>
          <li><Link to="/">Default</Link></li>
          {categories !== undefined && categories.map( category =>
            <li key={category.name}><Link to={category.path}>{category.name}</Link></li>
          )}
        </ul>
        )
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (data) => dispatch(addPost(data)),
  fetchCategories: (data) => dispatch(fetchCategories(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
// export default Categories