import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

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

  const match = useRouteMatch('/users/:id')
  const userInfo = match
    ? users.find(u => u.id === match.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogInfo = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

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
        <Route path='/users/:id'>
          <UserInfo userInfo={userInfo}/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogInfo blogInfo={blogInfo}/>
        </Route>
        <Route path='/users'>
          <UserList/>
        </Route>
        <Route path='/'>
          <div>
            {blogForm()}
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App