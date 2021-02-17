import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url:url
    }

    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input value={title} onChange={({ target }) => setTitle(target.value)} id='title'/>
        </div>
        <div>
          author:
          <input value={author} onChange={({ target }) => setAuthor(target.value)} id='author' />
        </div>
        <div>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} id='url'/>
        </div>
        <button type="submit" id='create-blog'>create</button>
      </form>
    </div>
  )
}

export default BlogForm