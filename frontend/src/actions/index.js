import * as theAPI from '../theAPI.js'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const UPVOTE_POST = "UPVOTE_POST";
export const DOWNVOTE_POST = "DOWNVOTE_POST";
export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  theAPI
      .getCat()
      .then(categories => dispatch(receiveCategories(categories)))
      // .then(categories => console.log(categories))
);

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  theAPI
      .getPosts()
      .then(posts => dispatch(receivePosts(posts)))
      // .then(posts => console.log(posts))
);

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const fetchComments = (id) => dispatch => (
  theAPI
      .getComments(id)
      .then(comments => dispatch(receiveComments(comments)))
      // .then(comments => console.log(comments))
);

export const editPost = (id, title, body) => ({
  type: EDIT_POST,
  title,
  body
});

export const sendPost = (id, post) => dispatch => (
  theAPI
      .putPost(id, post)
      // .then(post => dispatch(editPost(id, post.title, post.body)))
      // .then(data => console.log(data))
);

export const upVotePost = id =>({
  type: UPVOTE_POST,
  id
});

export const downVotePost = id =>({
  type: DOWNVOTE_POST,
  id
});

export const upVoteComment = id =>({
  type: UPVOTE_COMMENT,
  id
});

export const downVoteComment = id =>({
  type: DOWNVOTE_COMMENT,
  id
});


export const addPost = ({ title, content }) => ({
    type: ADD_POST,
    title,
    content
})