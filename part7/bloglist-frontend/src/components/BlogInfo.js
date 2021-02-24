import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blogInfo }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [comment, setComment] = useState('')

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

  const addCommentToBlog = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blogInfo.id, comment))
  }

  return (
    <div>
      <h2>{blogInfo.title}</h2>
      <a href={blogInfo.url}>{blogInfo.url}</a><br/>
      {blogInfo.likes} likes <button onClick={likePlusBlog}>like</button><br/>
      added by {blogInfo.author}<br/>
      <button onClick={removeBlogAndBack}>remove</button>

      <h3>comments</h3>
      <div>
        <form onSubmit={addCommentToBlog}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} id='comment'/>
          <button type='submit'>add comment</button>
        </form>
      </div>
      <ul>
        {blogInfo.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogInfo