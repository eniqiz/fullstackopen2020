import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blogInfo }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if (!blogInfo) {
    return null
  }

  const likePlusBlog = () => {
    const blogObject = {
      ...blogInfo,
      likes: blogInfo.likes + 1
    }

    dispatch(likeBlog(blogInfo.id, blogObject))
  }

  const removeBlogAndBack = () => {
    dispatch(removeBlog(blogInfo.id))
    history.push('/')
  }

  return (
    <div>
      <h2>{blogInfo.title}</h2>
      <a href={blogInfo.url}>{blogInfo.url}</a><br/>
      {blogInfo.likes} likes <button onClick={likePlusBlog}>like</button><br/>
      added by {blogInfo.author}<br/>
      <button onClick={removeBlogAndBack}>remove</button>

      <h3>comments</h3>
      <ul>
        {blogInfo.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogInfo