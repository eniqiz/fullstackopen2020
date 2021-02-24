import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addNewBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control value={title} onChange={({ target }) => setTitle(target.value)} id='title'/>
          <Form.Label>author:</Form.Label>
          <Form.Control value={author} onChange={({ target }) => setAuthor(target.value)} id='author'/>
          <Form.Label>url:</Form.Label>
          <Form.Control value={url} onChange={({ target }) => setUrl(target.value)} id='url'/>
          <Button type="submit" id='create-blog' variant='primary'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm