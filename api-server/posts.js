const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "1b6f9e58-ea67-4889-b5f3-1d4ea3085a63": {
    id: '1b6f9e58-ea67-4889-b5f3-1d4ea3085a63',
    timestamp: 1510769958506,
    title: '5 Quotes About Sociology and UX Design',
    body: 'Why sociologists, artists, and anthropologists make great UX Designers, and why you should embrace lifelong learning if you’re a GenXer',
    author: 'udacity',
    category: 'udacity',
    voteScore: 2,
    deleted: false,
    commentCount: 0
  },
  "2ba396f8-c03d-4401-a979-bbb24b52a64b": {
    id: '2ba396f8-c03d-4401-a979-bbb24b52a64b',
    timestamp: 1510770169992,
    title: 'React "Aha" Moments',
    body: 'One of my main goals whenever I’m teaching or writing technical content is to maximize “aha” moments. An “aha” moment is a moment of sudden insight or clarity; when the subject matter suddenly makes sense. We’ve all experienced them and the best teachers I know are able to understand their audience and adapt the lesson in order to maximize these moments. Throughout the last few years I’ve taught React in just about every popular medium. Throughout that time I’ve been taking notes on what triggers these “aha” moments, specifically for learning React. About two weeks ago I came across this Reddit thread which had the same idea. So what I want to do in this post is share my collection of these moments while also adding my thoughts on some of the moments shared in that Reddit thread. Hopefully it will help React “click” for you if it hasn’t yet.',
    author: 'tylermcginnis',
    category: 'react',
    voteScore: 12,
    deleted: false,
    commentCount: 2
  },
  "2d6a9c0b-9d9d-437a-b82e-c62392fbee69": {
    id: '2d6a9c0b-9d9d-437a-b82e-c62392fbee69',
    timestamp: 1510770313595,
    title: 'You’re Missing the Point of React',
    body: 'I’ve seen React misunderstood by smart people more often than any other JavaScript library. React is packed with ideas that were radical at the time of its introduction. This created an air of controversy that still hasn’t quite dissolved. After a year of using React and observing people learning it, I can say that the best parts of React are not the ones that made it famous. They’re not virtual DOM, custom event system, server rendering or JSX. Rather, they are a few boring, old and powerful ideas.',
    author: 'Dan Abramov',
    category: 'react',
    voteScore: 8,
    deleted: false,
    commentCount: 0
  },
  "f1703fee-7055-45b3-96b0-ecbae9313d4f": {
    id: 'f1703fee-7055-45b3-96b0-ecbae9313d4f',
    timestamp: 1510770570739,
    title: 'Step by Step Guide To Building React Redux Apps',
    body: 'Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming! When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.',
    author: 'rajaraodv',
    category: 'redux',
    voteScore: 5,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
