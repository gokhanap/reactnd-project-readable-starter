import React, { Component } from 'react';
import { Button, List, Input, Form } from 'semantic-ui-react'
import { Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { sendPost } from '../actions'

export class AddPost extends Component {
  state = {
    activeTrash: false,
    post: {
      title: "",
      body: "",

    }
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
    // const { post } = this.props
    // this.setState({
    //   post
    // })
  }


  render() {
    const { title, body } = this.state.post
    const { activeUp, activeDown, activeTrash } = this.state
    console.log(this.state)
    return (
      activeTrash === true &&
      <List.Item>

        <Form onSubmit={this.handleOnSubmit} id="generate.id">
          <Form.Input name="title" label="Title" value={title} onChange={this.handleOnChange}/>
          <Form.Input name="body" label="Body" value={body} onChange={this.handleOnChange}/>
          <Form.Button>Submit</Form.Button>
        </Form>








      </List.Item>

      )

  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  sendPost: (id, { title, body }) => dispatch(sendPost(id, { title, body }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPost))
