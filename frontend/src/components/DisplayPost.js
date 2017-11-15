import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom';
import { upVotePostAPI, downVotePostAPI } from '../actions'
import { Button, Segment, Header, Container } from 'semantic-ui-react'
import ListComments from './ListComments'
import { deletePostAPI, fetchComments } from '../actions'

export class DisplayPost extends Component {
  state = {
  }

  handleClickUp = () => {
    const { id } = this.props.post
    // this.setState({ activeUp: !this.state.activeUp })
    this.props.upVotePostAPI(id)
    }

  handleClickDown = () => {
    const { id } = this.props.post
    // this.setState({ activeDown: !this.state.activeDown })
    this.props.downVotePostAPI(id)
    }

  handleClickTrash = () => {
    const { deletePostAPI, post } = this.props
    deletePostAPI(post.id)
  }

  componentWillMount() {
    this.props.fetchComments(this.props.post.id)
  }

  render() {
    const { post, showComments = false } = this.props
    // console.log(typeof post)
    // console.log(this.props)
    return (

      // typeof post !== "undefined" &&
      post.deleted !== true &&
      <Segment>
        <Container>
          <Header
          as={Link}
          to={`/${post.category}/${post.id}`}>
          {post.title}
          </Header>

          <p>{post.body}<br/>
          <i>Author: {post.author}</i>
          </p>

          <Button.Group basic compact size="mini">
            <Button
            onClick={this.handleClickUp}
            icon="chevron up">
            </Button>

            <Button.Or text={post.voteScore} />

            <Button
            onClick={this.handleClickDown}
            icon="chevron down">
            </Button>
          </Button.Group>

          <Button.Group basic compact size="mini">
            <Button
            icon="write"
            as={Link}
            to={`/${post.category}/${post.id}/edit`}>
            </Button>

            <Button
            onClick={this.handleClickTrash}
            icon="trash">
            </Button>

            <Button
            content="comments"
            icon="comments"
            label={{ basic: true, pointing: 'left', content: `${post.commentCount}` }}
            as={Link}
            to={`/${post.category}/${post.id}`}/>
          </Button.Group>

        </Container>

        {(
          showComments === true
          &&
        <ListComments parentId={post.id}/>
        )}

      </Segment>

      )
  }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  upVotePostAPI: (id) => dispatch(upVotePostAPI(id)),
  downVotePostAPI: (id) => dispatch(downVotePostAPI(id)),
  deletePostAPI: (id) => dispatch(deletePostAPI(id)),
  fetchComments: (data) => dispatch(fetchComments(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPost))