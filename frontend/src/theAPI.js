
const api = "http://localhost:3001"

const headers = {
  'Authorization': 'token'
}

const initGET = {
  method: 'GET',
  headers
}

const initPUT = {
  method: 'PUT',
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


export const putPost = (id, post) =>
  fetch(`${api}/posts/${id}`,
    { method: 'GET',
    headers: headers
    }
  )
  .then(res => res.json())
  .then(res => console.log("APIresult:",res))







// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
    // .then(data => data.books)
