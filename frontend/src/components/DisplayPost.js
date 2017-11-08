import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter} from 'react-router-dom';
import { upVotePost, downVotePost } from '../actions'
import { List, Button, Segment, Header, Container } from 'semantic-ui-react'
import ListComments from './ListComments'

export class DisplayPost extends Component {
  state = {
    activeTrash: false,
    showComments: true
  }

  handleClickUp = () => {
    const { id } = this.props.post
    // this.setState({ activeUp: !this.state.activeUp })
    this.props.upVotePost(id)
    }

  handleClickDown = () => {
    const { id } = this.props.post
    // this.setState({ activeDown: !this.state.activeDown })
    this.props.downVotePost(id)
    }

  handleClickTrash = () => this.setState({ activeTrash: !this.state.activeTrash })

  render() {
    const { post } = this.props
    const { activeUp, activeDown, activeTrash, showComments } = this.state
    // console.log(post)
    // console.log(this.props)
    return (


      // activeTrash !== true &&
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
            active={activeUp}
            onClick={this.handleClickUp}
            icon="chevron up">
            </Button>

            <Button.Or text={post.voteScore} />

            <Button
            active={activeDown}
            onClick={this.handleClickDown}
            icon="chevron down">
            </Button>

            <Button floated="right"
            icon="write"
            as={Link}
            to={`/${post.category}/${post.id}/edit`}>
            </Button>

            <Button floated="right"
            active={activeTrash}
            onClick={this.handleClickTrash}
            icon="trash">
            </Button>

            <Button floated="right"
            content="comments"
            icon="comments"
            label={{ basic: true, pointing: 'left', content: `${post.commentCount}` }}
            />
          </Button.Group>


        </Container>

        {(
          showComments === true
          &&
          <p>hiia</p>
        // <ListComments />
        )}


      </Segment>
      

      )

  }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id) => dispatch(upVotePost(id)),
  downVotePost: (id) => dispatch(downVotePost(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPost))