import React, { Component } from 'react';
import { Grid, Divider, Form, Message, Select } from 'semantic-ui-react'
import { withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { addPostAPI, editPostAPI } from '../actions'

export class PostEditor extends Component {
  state = {
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
    success: false,
    isCategorySelected: false,
    displayError: false,
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    })
    name === "category" &&
    this.setState({
      isCategorySelected: true,
      displayError: false
    })
  }

  handleOnSubmit = () => {
    const { post, isCategorySelected } = this.state
    const { addPostAPI, editPostAPI, submit} = this.props

    if (submit === "add" && isCategorySelected) {
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
    }
    else if (submit === "edit") {
      editPostAPI(post)
      this.makeSuccess()
    }
    else if (!isCategorySelected) {
      this.setState({
        displayError: true
      })
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
    const { categories, isCategorySelected, displayError } = this.state
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


            <Form.Field error={displayError} required
            control={Select}
            placeholder="Select category"
            name="category"
            label="Category"
            value={category}
            options={categories}
            onChange={this.handleOnChange}/>

            {displayError &&
              <Message negative>
                <Message.Header>Please select a category</Message.Header>
                <p>A post without a category can not be submitted.</p>
              </Message>
            }

            <Form.Button>Submit</Form.Button>

            { this.state.success &&
              <Redirect to={`/${category}/${id}`}/>
            }

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