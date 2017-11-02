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

import { Container, Header, Icon } from 'semantic-ui-react'


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
      <Container>
        <Header as="h3" textAlign="center" icon>
          <Icon name='comments outline' color="teal" />
          <Header.Content color="teal" content="Readable" />
          <Header.Subheader color="teal" content="App" />

        </Header>
        <Route exact path="/" render={() => (
          <div>
            <Categories />
            <Posts categories="all" />
          </div>
        )}/>



        <Route exact path="/react" render={() => (
          <div>
            <Categories />
            <Posts category="react" />
          </div>
        )}/>

        <Route exact path="/redux" render={() => (
          <div>
            <Categories />
            <Posts category="redux" />
          </div>
        )}/>

        <Route exact path="/udacity" render={() => (
          <div id='udacity'>
            <Categories />
            <Posts category="udacity" />
          </div>
        )}/>



        <Route exact path="/createdit" render={() => (
          <Createdit />
        )}/>

        <Route exact path="/:category/:id" render={() => (
          <div>
            <p>I am a comment</p>
          </div>
        )}/>

      </Container>
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