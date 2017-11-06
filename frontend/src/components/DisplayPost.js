import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter} from 'react-router-dom';
import { upVotePost, downVotePost } from '../actions'
import { List, Button, Segment, Header, Container } from 'semantic-ui-react'

export class DisplayPost extends Component {
  state = {
    activeTrash: false
  }

  handleClickUp = () => {
    const { id } = this.props.post
    this.setState({ activeUp: !this.state.activeUp })
    // console.log(id)
    this.props.upVotePost(id)
    }

  handleClickDown = () => {
    const { id } = this.props.post
    this.setState({ activeUp: !this.state.activeDown })
    // console.log(id)
    this.props.downVotePost(id)
    }

  handleClickTrash = () => this.setState({ activeTrash: !this.state.activeTrash })

  render() {
    const { post } = this.props
    const { activeUp, activeDown, activeTrash } = this.state
    // console.log(post)
    console.log(this.props)
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
            positive
            active={activeUp}
            onClick={this.handleClickUp}
            icon="chevron up">
            </Button>

            <Button.Or text={post.voteScore} />

            <Button
            negative
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