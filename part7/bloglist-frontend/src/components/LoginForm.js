import React from 'react'
import Notification from './Notification'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(login(user))
      history.push('/')
    } catch (exception) {
      dispatch(setNotification(null, 'wrong username or password', 5))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>username<input id='username' { ...username }/></div>
        <div>password<input id='password' { ...password }/></div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm