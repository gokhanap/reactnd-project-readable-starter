import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, fetchCategories, receiveCategories } from '../actions'
import { Menu } from 'semantic-ui-react'


export class Categories extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handle = () => {
    this.props.addPost({})
  }


  render() {
    const { activeItem } = this.state
    const { categories } = this.props

    // console.log("props", this.props);
    return (

      <Menu widths="4">

        <Menu.Item
          name="All Posts"
          key="AllPosts"
          active={activeItem === 'All Posts'}
          content="All Posts"
          onClick={this.handleItemClick}
          as={Link}
          to="./"
        />

        {categories !== undefined && categories.map( category =>

          <Menu.Item
            key={category.name}
            name={category.name}
            active={activeItem === category.name}
            content={category.name}
            onClick={this.handleItemClick}
            as={Link}
            to={`/${category.path}`}
          />
        )}


      </Menu>





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