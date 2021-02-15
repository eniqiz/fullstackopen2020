import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  message,
  errorMessage,
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <div>
    <h2>Log in to application</h2>
    <Notification message={message} errorMessage={errorMessage}/>
    <form onSubmit={handleLogin}>
      <div>username<input value={username} onChange={( { target } ) => setUsername(target.value)}/></div>
      <div>password<input value={password} onChange={( { target } ) => setPassword(target.value)} type="password"/></div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm