
const api = "http://localhost:3001"

const headers = {
  'Authorization': 'token',
  'Content-Type': 'application/json'
}

const initGET = {
  method: 'GET',
  headers
}

export const getCat = () =>
  fetch(`${api}/categories`, initGET)
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, initGET)
  .then(res => res.json())

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, initGET)
  .then(res => res.json())
  // .then(res => console.log(res))


export const addPostAPI = (post) =>
  fetch(`${api}/posts`,{
    method: 'POST',
    body: JSON.stringify( post ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const editPostAPI = (id, post) =>
  fetch(`${api}/posts/${post.id}`,{
    method: 'PUT',
    body: JSON.stringify( {id, post} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const deletePostAPI = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify( id ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const addCommentAPI = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    body: JSON.stringify( comment ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const editCommentAPI = (id, comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify( {id, comment} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const upVotePostAPI = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify( {id, option} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const downVotePostAPI = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify( {id, option} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const upVoteCommentAPI = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify( {id, option} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))


export const downVoteCommentAPI = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify( {id, option} ),
    headers
    })
  .then(res => res.json())
  // .then(res => console.log("APIresult:",res))
