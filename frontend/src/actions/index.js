import * as theAPI from '../theAPI.js'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  theAPI
      .getCat()
      .then(categories => dispatch(receiveCategories(categories)))
      .then(categories => console.log(categories))
);

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  theAPI
      .getPosts()
      .then(posts => dispatch(receivePosts(posts)))
      .then(posts => console.log(posts))
);




export const addPost = ({ title, content }) => ({
    type: ADD_POST,
    title,
    content
})