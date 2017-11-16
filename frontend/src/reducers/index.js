import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
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

function appReducer (state = initialState, action) {

    const { post, id, parentId, categories, posts, comments, comment } = action

    switch (action.type) {

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
                posts: {
                    ...state.posts,
                    ...formattedPosts
                }
            }

        case RECEIVE_COMMENTS :
            let formattedComments = {}
            comments.map(comment => {
                formattedComments[comment.id] = comment
            })
        return {
                ...state,
                comments: {
                    ...state.comments,
                    ...formattedComments
                }
            }


        case ADD_POST :
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: {
                        ...post,
                        voteScore: 1,
                        deleted: false,
                        commentCount: 0
                    }
                }
            }

        case EDIT_POST :
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: {
                        ...post,
                    }
                }
            }

        case DELETE_POST :
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id]: {
                        ...state.posts[id],
                        deleted: true
                    }
                }
            }

        case ADD_COMMENT :
        let newCommentCount = state.posts[comment.parentId].commentCount += 1
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: {
                        ...comment
                    }
                },
                posts: {
                    ...state.posts,
                    [comment.parentId]: {
                        ...state.posts[comment.parentId],
                        commentCount: newCommentCount
                    }
                }
            }

        case EDIT_COMMENT :
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: {
                        ...comment,
                    }
                }
            }

        case DELETE_COMMENT :
        let updatedCommentCount = state.posts[parentId].commentCount -= 1
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [id]: {
                        ...state.comments[id],
                        deleted: true
                    }
                },
                posts: {
                    ...state.posts,
                    [parentId]: {
                        ...state.posts[parentId],
                        commentCount: updatedCommentCount
                    }
                }
            }

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

        default:
            return state
    }
}

export default appReducer