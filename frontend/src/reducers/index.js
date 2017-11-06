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
    } from '../actions'
import * as theAPI from '../theAPI.js'
import { addPost, fetchCategories, receiveCategories } from '../actions'



// let initialState = {
//     categories: ['react', 'redux', 'udacity'],
//     comments: null
// }


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
            let newposts = {}
            posts.map(post => {
                newposts[post.id] = post
            })
            return {
                ...state,
                posts: newposts
            }

        case RECEIVE_COMMENTS :
            return {
                ...state,
                // comments
            }

        case EDIT_POST :

            // let newpost = state.posts.filter(post => post.id === id);
            // newpost[body] = body,
            console.log(id)

            return {}


        case UPVOTE_POST :
        let upNewScore = state.posts[id].voteScore += 1
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id] : {
                        ...state.posts[id],
                        voteScore: upNewScore
                    }
                }
            }

        case DOWNVOTE_POST :
        let downNewScore = state.posts[id].voteScore -= 1
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id] : {
                        ...state.posts[id],
                        voteScore: downNewScore
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