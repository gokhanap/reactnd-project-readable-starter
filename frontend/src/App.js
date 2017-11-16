import React, { Component } from 'react'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import './App.css'

import Categories from './components/Categories'
import ListPosts from './components/ListPosts'
import DisplayPost from './components/DisplayPost'
import PostEditor from './components/PostEditor'

import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'

import { Icon, Header, Container , Button, Divider} from 'semantic-ui-react'


export class App extends Component {

  componentWillMount() {
    this.props.fetchCategories({})
    this.props.fetchPosts({})
  }

  render() {
    const { categories = [], posts = {} } = this.props
    let formattedPosts = Object.values(posts)

    return (
      <Container>
        <Header textAlign="center" icon>
          <Icon name='comments outline' color="teal" />
          <Header.Content color="teal" content="Readable" />
          <Header.Subheader color="teal" content="App" />
        </Header>

        <Switch>

          <Route exact path="/" render={() => (
            <div>
              <Categories category="All Posts" />
              <ListPosts currentCategory="all"/>
            </div>
          )}/>

          <Route strict exact path="/:category/" render={( { match } ) => (
            <div>
              {(
                categories.filter( category => match.params.category === category.name).map( category =>
                  <div key={category.name}>
                    <Categories category={category.name} />
                    <ListPosts currentCategory={category.name}/>
                  </div>
                )
              )}
            </div>
          )}/>

          <Route exact path="/addpost" render={() => (
            <div>
              <Categories category="Add Post" />
              <PostEditor submit="add" />
            </div>
          )}/>

          <Route exact path="/:category/:id" render={( { match } ) => (
            <div>
              <Categories />
              {(
                formattedPosts.length > 0 &&
                  formattedPosts.filter(( { id } ) => match.params.id === id).map(( { id } ) =>
                    <DisplayPost key={id} post={posts[id]} showComments={true}/>
                  )
              )}
            </div>
          )}/>

        <Route exact path="/:category/:id/edit" render={( { match } ) => (
            <div>

              {(
                formattedPosts.length > 0 &&
              <PostEditor key={posts[match.params.id]['id']} post={posts[match.params.id]} submit="edit" />
              )}

            </div>
        )}/>

          <Route render={() => (
            <Container textAlign='center'>
              <Divider section />
              <Header as='h1'>404 not found</Header>
              <Divider section />
              <Button as={Link} to="/" color='teal'>Let's start again</Button>
            </Container>
          )}/>

        </Switch>

      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.posts,
  comments: state.comments
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (data) => dispatch(fetchCategories(data)),
  fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))