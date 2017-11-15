import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayComment from './DisplayComment'
import { addCommentAPI } from '../actions'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'

export class ListComments extends Component {
  state = {
    newComment: {
      id: "",
      parentId: "",
      timestamp: "",
      body: "",
      author: "",
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        [name]: value
      }
    })
    }

  handleOnSubmit = () => {
    const { addCommentAPI, parentId } = this.props
    const { makeId, clearForm } = this

    const preparedComment = { ...this.state.newComment }
    preparedComment.id = makeId()
    preparedComment.timestamp = Date.now()
    preparedComment.parentId = parentId
    addCommentAPI(preparedComment)
    clearForm()
  }

  makeId = () => {
    const generateId = a => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateId)
    return generateId()
  }

  clearForm = () => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        author: '',
        body: ''
      }
    })
  }

  render() {

    const { parentId, comments = {} } = this.props
    const { body, author } = this.state.newComment
    let commentsArr = Object.values(comments)

    return (

      <Segment>
        <Comment.Group minimal>

          {(commentsArr.length > 0
          &&
          (
            commentsArr.filter(comment => comment.parentId === parentId).map(comment =>
              <DisplayComment key={comment.id} comment={comment}/>
            )
          )
          )}
              <Form onSubmit={this.handleOnSubmit} reply>
                <Form.TextArea
                name="body"
                value={body}
                onChange={this.handleOnChange}
                placeholder='Write comment here...' />

                <Form.TextArea
                name="author"
                value={author}
                onChange={this.handleOnChange}
                autoHeight
                rows={1}
                placeholder='Write author name here' />

                <Button content='Add Reply' labelPosition='left' icon='write' color="teal" />
              </Form>
            </Comment.Group>
      </Segment>

    )
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments,
})

const mapDispatchToProps = (dispatch) => ({
  addCommentAPI: (comment) => dispatch(addCommentAPI(comment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))