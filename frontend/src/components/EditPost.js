import React, { Component } from 'react';
import { Button, List, Input, Form } from 'semantic-ui-react'
import { Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { sendPost } from '../actions'

export class EditPost extends Component {
  state = {
    activeTrash: true,

  }

  handleClickUp = () => this.setState({ activeUp: !this.state.activeUp })
  handleClickDown = () => this.setState({ activeDown: !this.state.activeDown })
  handleClickTrash = () => this.setState({ activeTrash: !this.state.activeTrash })

  handleOnChange = (e, {name, value}) => {
        this.setState({
          post: {
            ...this.state.post,
            [name]: value
          }
        })
  }

  handleOnSubmit = () => {
    const { post } = this.state
    // console.log("handlepost", post)
    this.props.sendPost(post.id, post)
  }


  componentWillMount() {
    const { post } = this.props
    this.setState({
      post
    })
  }


  render() {
    const { title, body } = this.state.post
    const { post } = this.props
    const { activeUp, activeDown, activeTrash } = this.state
    console.log(this.state)
    return (
      activeTrash === true &&
      <List.Item key={post.id}>

        <Form onSubmit={this.handleOnSubmit} id={post.id}>
          <Form.Input name="title" label="Title" value={title} onChange={this.handleOnChange}/>
          <Form.Input name="body" label="Body" value={body} onChange={this.handleOnChange}/>
          <Form.Button>Submit</Form.Button>
        </Form>






        <List.Content>

            <Button.Group basic compact size="mini">

              <Button
              toggle active={activeUp}
              onClick={this.handleClickUp}
              icon="chevron up">
              </Button>

              <Button.Or text={post.voteScore} />

              <Button
              toggle
              active={activeDown}
              onClick={this.handleClickDown}
              icon="chevron down">
              </Button>

              <Button
              icon="write"
              as={Link}
              to={`/${post.category}/${post.id}/edit`}>
              </Button>

              <Button
              active={activeTrash}
              onClick={this.handleClickTrash}
              icon="trash">
              </Button>

              <Button
              content="comments"
              icon="comments"
              color='grey'
              label={{ basic: true, color: 'grey', pointing: 'left', content: `${post.commentCount}` }}
              />
            </Button.Group>

        </List.Content>

        <Route path="/:category/:id" render={() => (
          <List.Content>
            Comments:
          </List.Content>
        )}/>

      </List.Item>

      )

  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  sendPost: (id, { title, body }) => dispatch(sendPost(id, { title, body }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))
