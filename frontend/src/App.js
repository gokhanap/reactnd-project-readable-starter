import React, { Component } from 'react'
import { Route, withRouter, Switch, Link } from 'react-router-dom'
// import logo from './logo.svg'
import './App.css'
import * as theAPI from './theAPI.js'

import Categories from './components/Categories'
import ListPosts from './components/ListPosts'
import DisplayPost from './components/DisplayPost'
import EditPost from './components/EditPost'
import AddPost from './components/AddPost'

import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments } from './actions'

import { Icon, List, Button, Segment, Header, Container, Label } from 'semantic-ui-react'

import sortBy from 'sort-by'


export class App extends Component {

  componentWillMount() {
    this.props.fetchCategories({})
    this.props.fetchPosts({})
    this.props.fetchComments("8xf0y6ziyjabvozdd253nd")
  }



  render() {
    // console.log(this.props.categories)
    const { categories = [null], posts = {} } = this.props

    // let sortedPosts = Object.values(posts)
    // sortedPosts = sortedPosts.sort(sortBy(sortOption))


    // const sortedAllPostIds = sortedPosts.reduce((p,c) => [...p, c.id], [])



    // console.log(categories)
    // console.log(Object.values(posts))
    // console.log(sortedAllPostIds)
    return (
      <Container>
        <Header textAlign="center" icon>
          <Icon name='comments outline' color="teal" />
          <Header.Content color="teal" content="Readable" />
          <Header.Subheader color="teal" content="App" />

        </Header>


        <Switch>



          <Route exact path="/" render={() => (
            <div>
              <Categories category="All Posts" />
              <ListPosts />
            </div>
          )}/>


          <Route exact path="/react" render={() => (
            <div>
              <Categories category="react" />
              <ListPosts currentCategory="react"/>
            </div>
          )}/>

          <Route exact path="/redux" render={() => (
            <div>
              <Categories category="redux" />
              <ListPosts currentCategory="redux"/>
            </div>
          )}/>

          <Route exact path="/udacity" render={() => (
            <div>
              <Categories category="udacity" />
              <ListPosts currentCategory="udacity"/>
            </div>
          )}/>

          <Route exact path="/addpost" render={() => (
            <div>
              <Categories category="Add Post" />
              <AddPost />
            </div>
          )}/>

          <Route exact path="/:category/:id" render={( { match } ) => (
            <div>
              <Categories />

              {(
                Object.keys(posts).length > 0 &&
                  posts.filter(id => match.params.id == id).map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}

            </div>
          )}/>

        <Route exact path="/:category/:id/edit" render={( { match } ) => (
            <div>
              <List celled divided relaxed>
              {(
                posts !== {} &&
                  posts.filter(post => match.params.id == post.id).map(post =>
                    <EditPost key={post.id} post={post}/>
                  )
              )}
              </List>
            </div>
        )}/>

          <Route render={() => (
            <h2>404 not found</h2>
          )}/>
        </Switch>

      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.posts,
  comments: state.comments
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (data) => dispatch(fetchCategories(data)),
  fetchPosts: (data) => dispatch(fetchPosts(data)),
  fetchComments: (data) => dispatch(fetchComments(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))