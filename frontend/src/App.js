import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
// import logo from './logo.svg'
import './App.css'
import * as theAPI from './theAPI.js'

import Categories from './components/Categories'
import Posts from './components/Posts'
import Post from './components/Post'
import Createdit from './components/Createdit'

import { connect } from 'react-redux'
import { fetchCategories,fetchPosts } from './actions'


export class App extends Component {
  // state = {
  //   categories: []
  // }

  componentWillMount() {
    this.props.fetchCategories({})
    this.props.fetchPosts({})
  }

  render() {
    // console.log(this.props.categories)
    const { categories = [null] } = this.props

    // console.log(categories)
    return (
      <div>

        <Route exact path="/" render={() => (
          <div>
            <Categories />
            <Posts />
          </div>
        )}/>



        <Route path="/react" render={() => (
          <div>
            <Categories />
            <Posts category="react" />
          </div>
        )}/>

        <Route path="/redux" render={() => (
          <div>
            <Categories />
            <Posts category="redux" />
          </div>
        )}/>

        <Route path="/udacity" render={() => (
          <div id='udacity'>
            <Categories />
            <Posts category="udacity" />
          </div>
        )}/>



        <Route path="/createdit" render={() => (
          <Createdit />
        )}/>

        <Route path="/:category/post.id" render={() => (
          <Post />
        )}/>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (data) => dispatch(fetchCategories(data)),
  fetchPosts: (data) => dispatch(fetchPosts(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))