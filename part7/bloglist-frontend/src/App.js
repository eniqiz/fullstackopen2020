import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, null, 5))
    dispatch(createBlog(blogObject))
  }

  const likeABlog = (id, blogObject) => {
    dispatch(likeBlog(id, blogObject))
  }

  const removeABlog = (id) => {
    dispatch(removeBlog(id))
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
      dispatch(login(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(null, 'wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    logout()
    window.localStorage.clear()
    window.location.reload()
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeABlog} removeBlog={removeABlog}/>)}
        </div>
      }
    </div>
  )
}

export default App