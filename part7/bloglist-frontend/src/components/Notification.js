import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    if (notification.errorMessage === null) {
      return null
    } else {
      return (
        <div className="error">
          {notification.errorMessage}
        </div>
      )
    }
  } else {
    return (
      <div className="message">
        {notification.message}
      </div>
    )
  }
}

export default Notification