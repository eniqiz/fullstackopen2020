import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => (b.likes - a.likes))
  case 'NEW_BLOG':
    return [ ...state, action.data ]
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(e => e.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    const newState = state.map(b => b.id !== id ? b : likedBlog)
    return newState.sort((a, b) => (b.likes - a.likes))
  }
  case 'REMOVE':
    return state
      .filter(e => e.id !== action.data)
      .sort((a, b) => (b.likes - a.likes))
  case 'COMMENT': {
    const id = action.id
    const blogToComment = state.find(e => e.id === id)
    const commentedBlog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(action.comment)
    }
    const newState = state.map(b => b.id !== id ? b : commentedBlog)
    return newState.sort((a, b) => (b.likes - a.likes))
  }
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
  }
}

export const likeBlog = (id, blogToLike) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blogToLike)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    //eslint-disable-next-line
    const removedBlog = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    //eslint-disable-next-line
    const updatedBlog = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      id,
      comment
    })
  }
}

export default reducer