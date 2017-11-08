import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayPost from './DisplayPost'

import { Button, Container, Label } from 'semantic-ui-react'
import sortBy from 'sort-by'

export class ListPosts extends Component {
  state = {
    sortOption: 'voteScore'
  }

  handleDate = () => {
    this.setState({ sortOption: 'timestamp' })
    }

  handleScore = () => {
    this.setState({ sortOption: 'voteScore' })
    }

  render() {

    const { posts = {} } = this.props
    const { sortOption } = this.state
    const { currentCategory } = this.props

    let sortedPosts = Object.values(posts)
    sortedPosts = sortedPosts.sort(sortBy(sortOption)).reverse()
    const sortedAllPostIds = sortedPosts.reduce((p,c) => [...p, c.id], [])

    // console.log('posts', posts)
    // console.log('category', category)
    return (
      <div>
        <Container textAlign="right">
          <Label basic pointing="right">sort by</Label>
          <Button.Group basic compact size="mini" >
            <Button
            onClick={this.handleDate}
            active={sortOption === "timestamp"}
            content="date">
            </Button>

            <Button.Or text='or' />

            <Button
            onClick={this.handleScore}
            active={sortOption === "voteScore"}
            content="score">
            </Button>
          </Button.Group>
        </Container>
        {(
            sortedPosts.length > 0
            &&
            currentCategory !== "all"
            ?
            sortedAllPostIds.filter(id => posts[id]["category"] === currentCategory).map(id =>
              <DisplayPost key={id} post={posts[id]}/>
            )
            :
            sortedAllPostIds.map(id =>
              <DisplayPost key={id} post={posts[id]}/>
            )
        )}
      </div>

    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts,
})

const mapDispatchToProps = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))