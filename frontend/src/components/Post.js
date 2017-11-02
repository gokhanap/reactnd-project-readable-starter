import React, { Component } from 'react';
import { Button, List, Icon } from 'semantic-ui-react'

import { Route, Link, withRouter} from 'react-router-dom';

export class Post extends Component {
  state = {
    activeTrash: true
  }

  handleClickUp = () => this.setState({ activeUp: !this.state.activeUp })
  handleClickDown = () => this.setState({ activeDown: !this.state.activeDown })
  handleClickTrash = () => this.setState({ activeTrash: !this.state.activeTrash })

  render() {
    const { post = "category" } = this.props
    const { activeUp, activeDown, activeTrash } = this.state
    // console.log(post)
    return (
      activeTrash == true &&
      <List.Item key={post.id}>
        <List.Content
        as={Link}
        to={`/${post.category}/${post.id}`}
        >
          <List.Header>
          Title {post.title}
          </List.Header>

          <List.Content>
          Body {post.body}
          </List.Content>

          <List.Description floated="right">
            Author {post.author}
          </List.Description>

        </List.Content>

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
      </List.Item>

      )

  }
}

export default withRouter(Post)