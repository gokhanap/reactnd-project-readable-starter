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
  state = {
    sortOption: 'voteScore'
  }

  componentWillMount() {
    this.props.fetchCategories({})
    this.props.fetchPosts({})
    this.props.fetchComments("8xf0y6ziyjabvozdd253nd")
  }


  handleDate = () => {
    this.setState({ sortOption: 'timestamp' })
    }

  handleScore = () => {
    this.setState({ sortOption: 'voteScore' })
    }




  render() {
    // console.log(this.props.categories)
    const { categories = [null], posts = {} } = this.props
    const { sortOption } = this.state

    let sortedPosts = Object.values(posts)
    sortedPosts = sortedPosts.sort(sortBy(sortOption))


    const sortedAllPostIds = sortedPosts.reduce((p,c) => [...p, c.id], [])



    // console.log(categories)
    // console.log(Object.values(posts))
    // console.log(sortedAllPostIds)
    console.log(sortedPosts.length)
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


              <Container textAlign="right">

                <Label basic pointing="right">sort by</Label>

                <Button.Group basic compact size="mini" >
                  <Button
                  onClick={this.handleDate}
                  active={sortOption === "timestamp"}
                  content="date">
                  </Button>

                  <Button.Or text='or' />

                  <Button
                  onClick={this.handleScore}
                  active={sortOption === "voteScore"}
                  content="score">
                  </Button>

                </Button.Group>

              </Container>



              {(
                sortedPosts.length > 0 &&
                  sortedAllPostIds.map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>









          <Route exact path="/react" render={() => (
            <div>
              <Categories category="react" />
              {(
                  sortedPosts.length > 0 &&
                  sortedAllPostIds.filter(id => posts[id]["category"] == "react").map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>

          <Route exact path="/redux" render={() => (
            <div>
              <Categories category="redux" />
              {(
                  sortedPosts.length > 0 &&
                  sortedAllPostIds.filter(id => posts[id]["category"] == "redux").map(id =>
                    <DisplayPost key={id} post={posts[id]}/>
                  )
              )}
            </div>
          )}/>

          <Route exact path="/udacity" render={() => (
            <div>
              <Categories category="udacity" />
              {(
                  sortedPosts.length > 0 &&
                  sortedAllPostIds.filter(id => posts[id]["category"] == "udacity").map(id =>
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
                  sortedAllPostIds.filter(id => match.params.id == id).map(id =>
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