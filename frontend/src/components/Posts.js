import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, fetchPosts, receivePosts } from '../actions'
import { Post } from './Post'
import { Button, List, Icon } from 'semantic-ui-react'



class Posts extends Component {

  componentWillMount() {
  }

  render() {
    const { posts = [], category = 'all' } = this.props

    // console.log('posts', posts)
    // console.log('category', category)
    return (
      <div>
        <h2>This is {category} posts page</h2>


        <List celled divided relaxed>

          {(
            posts.length > 0 && category !== 'all' &&
              posts.filter(post => post.category == category).map(post =>
                <Post key={post.id} post={post}/>
              )
          )}
          {(
            posts.length > 0 && category === 'all' &&
              posts.map(post =>
                <Post key={post.id} post={post}/>
              )
          )}

        </List>



      </div>

    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (data) => dispatch(addPost(data)),
  fetchPosts: (data) => dispatch(fetchPosts(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))