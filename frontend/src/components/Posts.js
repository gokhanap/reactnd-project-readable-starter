import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, fetchPosts, receivePosts } from '../actions'



class Posts extends Component {

  componentWillMount() {
  }

  render() {
    const { posts, category } = this.props
    console.log('posts', posts)
    console.log('category', category)
    return (
      <div>
        <p>This is {category} posts page</p>
        <ul>

          {(
            posts !== undefined &&
              posts.map(post =>
                <div>
                  <li
                  className="post"
                  style={{
                    border: '2px solid #FF9800',
                  }}
                  key={post.category + post.id}>

                  <Link to={`/${post.category}/${post.id}`}>Title: {post.title}</Link><br/>
                  Body: {post.body}<br/>
                  Author: {post.author}<br/>
                  Score: {post.voteScore}
                  <button>Vote Up</button>
                  <button>Vote Down</button>
                  <button>Edit</button>
                  <button>Delete</button>
                  <br/>
                  Comments: {post.commentCount}<br/>
                  </li>

                  <Route path={`/${post.category}/${post.id}`} render={() => (
                    <div>Comments: {category} {post.id}</div>
                  )}/>
                </div>
              )

          )}

        </ul>



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