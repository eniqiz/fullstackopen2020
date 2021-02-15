import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likePlusBlog = () => {
    const blogObject = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1
    }

    likeBlog(blog.id, blogObject)
  }

  const removeOneBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={() => setBlogVisible(false)}>hide</button>
        <div>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={likePlusBlog}>like</button><br/>
          {blog.author}<br/>
          <button onClick={removeOneBlog}>remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog
