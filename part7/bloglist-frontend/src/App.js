import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom"


const App = () => {
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
    dispatch(initUsers())
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
        <LoginForm/>
        :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
        </div>
      }
      <Switch>
        <Route path='/users'>
          <UserList/>
        </Route>
        <Route path='/'>
          <div>
            {blogForm()}
            {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeABlog} removeBlog={removeABlog}/>)}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App