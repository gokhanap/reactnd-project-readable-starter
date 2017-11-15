import * as theAPI from '../theAPI.js'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
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


export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const addPostAPI = (post) => dispatch => (
  theAPI
      .addPostAPI(post)
      .then(res => dispatch(addPost(post)))
)


export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const editPostAPI = (post) => dispatch => (
  theAPI
      .editPostAPI(post.id, post)
      .then(res => dispatch(editPost(post)))
)


export const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

export const deletePostAPI = (id) => dispatch => (
  theAPI
      .deletePostAPI(id)
      .then(res => dispatch(deletePost(id)))
)


export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const addCommentAPI = comment => dispatch => (
  theAPI
      .addCommentAPI(comment)
      .then(post => dispatch(addComment(comment)))
)


export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const editCommentAPI = comment => dispatch => (
  theAPI
      .editCommentAPI(comment.id, comment)
      .then(post => dispatch(editComment(comment)))
)


export const upVotePost = id =>({
  type: UPVOTE_POST,
  id
});

export const upVotePostAPI = id => dispatch => (
  theAPI
      .upVotePostAPI(id, "upVote")
      .then(res => dispatch(upVotePost(id)))
)


export const downVotePost = id =>({
  type: DOWNVOTE_POST,
  id
});

export const downVotePostAPI = id => dispatch => (
  theAPI
      .downVotePostAPI(id, "downVote")
      .then(res => dispatch(downVotePost(id)))
)


export const upVoteComment = id =>({
  type: UPVOTE_COMMENT,
  id
});

export const upVoteCommentAPI = id => dispatch => (
  theAPI
      .upVoteCommentAPI(id, "upVote")
      .then(res => dispatch(upVoteComment(id)))
)


export const downVoteComment = id =>({
  type: DOWNVOTE_COMMENT,
  id
});

export const downVoteCommentAPI = id => dispatch => (
  theAPI
      .downVoteCommentAPI(id, "downVote")
      .then(res => dispatch(downVoteComment(id)))
)