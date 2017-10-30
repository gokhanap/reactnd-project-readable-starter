import {
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS
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

    const { post, id, day, meal, recipe, categories, posts } = action

    switch (action.type) {


        case RECEIVE_CATEGORIES :
            return {
                ...state,
                categories
            }

        case RECEIVE_POSTS :
            return {
                ...state,
                posts
            }

        case 'ADD_RECIPE' :
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label
                }
            }

        case ADD_POST:
            return Object.assign({}, state, {user: action.user})

        case REMOVE_POST:
            let newstate = state.filter(post => post.id !== action.post.id)
            return newstate

        default:
            return state
    }
}

export default appReducer