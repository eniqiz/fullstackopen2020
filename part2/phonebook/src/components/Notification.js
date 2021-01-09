const Notification = ({ message, errorMessage }) => {
  if (message === null) {
    if (errorMessage === null) {
      return null
    } else {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    }
  } else {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
}

export default Notification