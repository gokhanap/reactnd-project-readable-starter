import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';

class Post extends Component {
  render() {
    return <p>This is {this.props.post.id} Post</p>
  }
}

export default Post;