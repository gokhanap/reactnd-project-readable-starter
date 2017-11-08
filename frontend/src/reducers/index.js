import {
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS,
    RECEIVE_COMMENTS,
    UPVOTE_POST,
    DOWNVOTE_POST,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    } from '../actions'

let initialState = {}

// const fromapi = (theAPI.getPosts().then(data => console.log(data)))

function appReducer (state = initialState, action) {

    const { post, id, categories, posts, comments, title, body } = action

    switch (action.type) {

        // case RECEIVE_CATEGORIES :
        //     let newcategories = {}
        //     categories.map(category => {
        //         newcategories[category.name] = category
        //     })
        //     return {
        //         ...state,
        //         categories: newcategories
        //     }

        case RECEIVE_CATEGORIES :
            return {
                ...state,
                categories
            }

        case RECEIVE_POSTS :
            let formattedPosts = {}
            posts.map(post => {
                formattedPosts[post.id] = post
            })
            return {
                ...state,
                posts: formattedPosts
            }

        case RECEIVE_COMMENTS :
            let formattedComments = {}
            comments.map(comment => {
                formattedComments[comment.id] = comment
            })
        return {
                ...state,
                comments: formattedComments
            }

        case EDIT_POST :

            // let newpost = state.posts.filter(post => post.id === id);
            // newpost[body] = body,
            console.log(id)

            return {}


        case UPVOTE_POST :
        let upNewPostScore = state.posts[id].voteScore += 1
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id] : {
                        ...state.posts[id],
                        voteScore: upNewPostScore
                    }
                }
            }

        case DOWNVOTE_POST :
        let downNewPostScore = state.posts[id].voteScore -= 1
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id] : {
                        ...state.posts[id],
                        voteScore: downNewPostScore
                    }
                }
            }

        case UPVOTE_COMMENT :
        let upNewCommentScore = state.comments[id].voteScore += 1
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [id] : {
                        ...state.comments[id],
                        voteScore: upNewCommentScore
                    }
                }
            }

        case DOWNVOTE_COMMENT :
        let downNewCommentScore = state.comments[id].voteScore -= 1
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [id] : {
                        ...state.comments[id],
                        voteScore: downNewCommentScore
                    }
                }
            }


        // case 'ADD_RECIPE' :
        //     return {
        //         ...state,
        //         [day]: {
        //             ...state[day],
        //             [meal]: recipe.label
        //         }
        //     }

        // case ADD_POST:
        //     return Object.assign({}, state, {user: action.user})

        // case REMOVE_POST:
        //     let newstate = state.filter(post => post.id !== action.post.id)
        //     return newstate

        default:
            return state
    }
}

export default appReducer