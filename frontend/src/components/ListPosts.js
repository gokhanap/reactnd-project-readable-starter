import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, fetchPosts, receivePosts } from '../actions'
import { DisplayPost } from './DisplayPost'
import { Button, List, Icon } from 'semantic-ui-react'



export class ListPosts extends Component {

  componentWillMount() {
  }

  render() {
    const { posts = {}, category = 'all' } = this.props
    const allPostIds = Object.getOwnPropertyNames(posts)
    console.log('props', this.props)
    // console.log('posts', posts)
    // console.log('category', category)
    return (
      <div>



          {(
            Object.keys(posts).length > 0
            &&
            allPostIds.length > 0
            &&
            category !== 'all'
            ?
            // console.log(posts['6ni6ok3ym7mf1p33lnez']['category']) &&
            allPostIds.filter(id => posts[id]['category'] == category).map(id =>
              <DisplayPost key={id} post={posts[id]}/>
            )
            :
            allPostIds.map(id =>
              <DisplayPost key={id} post={posts[id]}/>
            )
          )}




      </div>

    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (data) => dispatch(addPost(data)),
  fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))