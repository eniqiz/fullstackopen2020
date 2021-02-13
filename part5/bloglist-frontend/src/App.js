import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
const [blogs, setBlogs] = useState([])
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)

useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )  
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: title,
    author: author,
    url:url
  }

  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
}

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = () => {
  window.localStorage.clear()
  window.location.reload()
}

const loginForm = () => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>username<input value={username} onChange={({target}) => setUsername(target.value)}/></div>
      <div>password<input value={password} onChange={({target}) => setPassword(target.value)} type="password"/></div>
      <button type="submit">login</button>
    </form>
  </div>
)
const blogForm = () => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input value={title} onChange={({target}) => setTitle(target.value)} />
    </div>
    <div>
      author:
      <input value={author} onChange={({target}) => setAuthor(target.value)} />
    </div>
    <div>
      url:
      <input value={url} onChange={({target}) => setUrl(target.value)} />
    </div>
    <button type="submit" >create</button>
  </form>
)

return (
  <div>
    <Notification message={errorMessage} />
    {user === null ?
      loginForm() :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
        <h2>create new</h2>
        {blogForm()}
        <ul>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </ul>
      </div>
    }
  </div>
)
}

export default App