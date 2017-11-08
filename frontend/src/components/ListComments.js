import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayComment from './DisplayComment'

import { Button, Container, Label, Comment, Header, Form, Segment, Divider } from 'semantic-ui-react'
import sortBy from 'sort-by'

export class ListComments extends Component {
  state = {
    newcomment: 'Add'
  }

  handleOnChange = (e, { value }) => {
    console.log(value)
    this.setState({ newcomment: value })
    }

  render() {

    const { parentId, comments = {} } = this.props
    const { sortOption } = this.state
    const { currentCategory } = this.props

    let commentsArr = Object.values(comments)

    // console.log('props', this.props)
    // console.log('comments', comments.length)
    // console.log('comments', comments)
    // console.log('category', category)
    return (

      <Segment>
        {(
          commentsArr.length > 0
          &&
          (
            <Comment.Group minimal>

              {commentsArr.filter(comment => comment.parentId === parentId).map(comment =>
                <DisplayComment key={comment.id} comment={comment}/>
              )}


              <Form reply>
                <Form.TextArea value={this.state.newcomment} onChange={this.handleOnChange}/>
                <Button content='Add Reply' labelPosition='left' icon='write' color="teal" />
              </Form>

            </Comment.Group>
          )
        )}
      </Segment>

    )
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments,
})

const mapDispatchToProps = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))