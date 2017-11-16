import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import { upVoteCommentAPI, downVoteCommentAPI } from '../actions'
import { Label, Icon, Comment, Form, Segment, Divider } from 'semantic-ui-react'
import { editCommentAPI, deleteCommentAPI } from '../actions'

export class DisplayComment extends Component {
  state = {
    editMode: false
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      comment: {
        ...this.state.comment,
        [name]: value
      }
    })
  }

  componentWillMount() {
    this.setState({
      comment: {
        ...this.state.comment,
        ...this.props.comment
      }
    })
  }

  handleClickUp = () => {
    const { id } = this.props.comment
    this.props.upVoteCommentAPI(id)
    }

  handleClickDown = () => {
    const { id } = this.props.comment
    this.props.downVoteCommentAPI(id)
    }

  handleClickEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
    }

  handleClickSubmit = () => {
    const { editCommentAPI } = this.props
    const comment = { ...this.state.comment }
    comment.timestamp = Date.now()

    editCommentAPI(comment)
    this.handleClickEditMode()
    }

  handleClickTrash = () => {
    const { id, parentId } = this.props.comment
    this.props.deleteCommentAPI(id, parentId)
  }

  render() {
    const { comment } = this.props
    const { editMode } = this.state

    const date = new Date(comment.timestamp).toLocaleString()

    if (editMode) {
    const { comment } = this.state
      return (
        <div>
        <Segment secondary>
          <Form size="tiny" onSubmit={this.handleOnSubmit} >
{/*              <Form.TextArea
              label="Edit Author"
              name="author"
              value={comment.author}
              onChange={this.handleOnChange}
              autoHeight
              rows={1} />*/}

              <Form.TextArea
              label="Edit Body"
              name="body"
              value={comment.body}
              onChange={this.handleOnChange}
              autoHeight
              rows={1} />

            <Form.Group>
              <Form.Button size="tiny" color="teal" onClick={this.handleClickSubmit}>Submit</Form.Button>
              <Form.Button size="tiny" color="red" onClick={this.handleClickEditMode}>Cancel</Form.Button>
            </Form.Group>
          </Form>
        </Segment>
          <Divider />
        </div>
      )

    } else {

      return (
        comment.deleted !== true &&

          <div>
          <Comment>
            <Comment.Content>
              <Comment.Author >{comment.author}</Comment.Author>
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
                    onClick={this.handleClickEditMode}/>

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
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  upVoteCommentAPI: (id) => dispatch(upVoteCommentAPI(id)),
  downVoteCommentAPI: (id) => dispatch(downVoteCommentAPI(id)),
  editCommentAPI: (comment) => dispatch(editCommentAPI(comment)),
  deleteCommentAPI: (id) => dispatch(deleteCommentAPI(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayComment))