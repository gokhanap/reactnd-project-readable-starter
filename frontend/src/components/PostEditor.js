import React, { Component } from 'react';
import { Grid, Divider, Form, Message } from 'semantic-ui-react'
import { withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { addPostAPI, editPostAPI } from '../actions'

export class PostEditor extends Component {
  state = {
    // activeTrash: false,
    categories: [
      {key:"react", value:"react", text:"React"},
      {key:"redux", value:"redux", text:"Redux"},
      {key:"udacity", value:"udacity", text:"Udacity"}
    ],
    post: {
      title: "",
      body: "",
      author: "",
      category: "",
      timestamp: "",
      id: ""
    },
    success: false
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    })
  }

  handleOnSubmit = () => {
    const { post } = this.state
    const { addPostAPI, editPostAPI, submit} = this.props

    if (submit === "add") {
      const newpost = { ...post }
      newpost.id = this.makeId()
      this.setState({
        post: {
          ...this.state.post,
          id: newpost.id
        }
      })
      newpost.timestamp = Date.now()
      addPostAPI(newpost)
      this.makeSuccess()
    } else {
      editPostAPI(post)
      this.makeSuccess()
    }
  }

  makeSuccess = () => {
    this.setState({
      success: !this.state.success
    })
  }

// generateId function source: https://gist.github.com/jed/982883
  makeId = () => {
    const generateId = a => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateId)
    return generateId()
  }

  componentWillMount() {
    this.setState({
      post: {
        ...this.state.post,
        ...this.props.post
      }
    })
  }

  render() {
    const { title, body, category, author, id } = this.state.post
    const { categories } = this.state
    const { submit } = this.props

    return (
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={10}>

          <Divider hidden />
          <Form onSubmit={this.handleOnSubmit}>

          {submit === "add" &&
            <Form.Input required
            placeholder="Write your full name"
            name="author"
            label="Author"
            value={author}
            onChange={this.handleOnChange}/>
          }

            <Form.Input required
            placeholder="Write title for the post"
            name="title"
            label="Title"
            value={title}
            onChange={this.handleOnChange}/>

            <Form.TextArea autoHeight required
            name="body"
            label="Body"
            value={body}
            onChange={this.handleOnChange}
            placeholder='Write body for the post'
            style={{ minHeight: 100 }} />

            <Form.Select selection required
            placeholder="Select category"
            name="category"
            value={category}
            options={categories}
            onChange={this.handleOnChange}/>

            <Form.Button>Submit</Form.Button>

            { this.state.success &&
              <Redirect to={`/${category}/${id}`}/>
            }
            <Message
              success
              header='Post Added'
              content="Your post added successfully."
            />
            <Message
              error
              header='Error'
              content='Please try again later.'
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>

      )
  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  addPostAPI: (post) => dispatch(addPostAPI(post)),
  editPostAPI: (post) => dispatch(editPostAPI(post))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditor))