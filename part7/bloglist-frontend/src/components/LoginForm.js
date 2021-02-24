import React from 'react'
import Notification from './Notification'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control id='username' { ...username }/>
          <Form.Label>password</Form.Label>
          <Form.Control id='password' { ...password }/>
          <Button id='login-button' type="submit" variant="primary">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm