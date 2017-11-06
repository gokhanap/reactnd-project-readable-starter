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

import { Container, Header, Icon, List } from 'semantic-ui-react'


export class App extends Component {
  // state = {
  //   categories: []
  // }

  componentWillMount() {
    this.props.fetchCategories({})
    this.props.fetchPosts({})
    this.props.fetchComments("8xf0y6ziyjabvozdd253nd")
  }

  render() {
    // console.log(this.props.categories)
    const { categories = [null], posts={} } = this.props
    const allPostIds = Object.getOwnPropertyNames(posts)

    // console.log(categories)
    // console.log(posts)
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
              {(
                Object.keys(posts).length > 0 &&
                  allPostIds.map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>

          <Route exact path="/react" render={() => (
            <div>
              <Categories category="react" />
              {(
                Object.keys(posts).length > 0 &&
                  allPostIds.filter(id => posts[id]["category"] == "react").map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>

          <Route exact path="/redux" render={() => (
            <div>
              <Categories category="redux" />
              {(
                Object.keys(posts).length > 0 &&
                  allPostIds.filter(id => posts[id]["category"] == "redux").map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>

          <Route exact path="/udacity" render={() => (
            <div>
              <Categories category="udacity" />
              {(
                Object.keys(posts).length > 0 &&
                  allPostIds.filter(id => posts[id]["category"] == "udacity").map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
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
                  allPostIds.filter(id => match.params.id == id).map(id =>
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