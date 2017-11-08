import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom';
import { upVoteComment, downVoteComment } from '../actions'
import { Label, Icon, Button, Comment, Form, Segment, Header, Container, Divider } from 'semantic-ui-react'

export class DisplayComment extends Component {
  state = {
    activeTrash: false,
  }

  handleClickUp = () => {
    const { id } = this.props.comment
    // this.setState({ activeUp: !this.state.activeUp })
    this.props.upVoteComment(id)
    }

  handleClickDown = () => {
    const { id } = this.props.comment
    // this.setState({ activeDown: !this.state.activeDown })
    this.props.downVoteComment(id)
    }

  handleClickEdit = () => {
    }

  handleClickTrash = () => this.setState({ activeTrash: !this.state.activeTrash })

  render() {
    const { comment } = this.props
    const { activeUp, activeDown, activeTrash, showComments } = this.state

    const date = new Date(comment.timestamp).toLocaleString()
    // console.log(post)
    // console.log(this.props)
    return (
      activeTrash !== true &&
      <div>
        <Comment>
          <Comment.Content>
            <Comment.Author as="a" disabled>{comment.author}</Comment.Author>
            <Comment.Metadata>{date}</Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <Segment basic compact clearing >
                  <Icon link
                  name='chevron up'
                  onClick={this.handleClickUp}/>

                  <Label circular>
                  {comment.voteScore}
                  </Label>

                  <Icon link
                  name='chevron down'
                  onClick={this.handleClickDown}/>

                  <Icon link
                  name='edit'
                  onClick={this.handleClickEdit}/>

                  <Icon link
                  name='trash'
                  onClick={this.handleClickTrash}/>
              </Segment>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        <Divider />
      </div>
      )

  }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  upVoteComment: (id) => dispatch(upVoteComment(id)),
  downVoteComment: (id) => dispatch(downVoteComment(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayComment))